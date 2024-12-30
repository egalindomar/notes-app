class Note < ApplicationRecord
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :body, presence: true

  def self.search_by_title(keywords)
    keywords.split.reduce(self) do |acc, word|
      acc.where "title LIKE ? ESCAPE '\\'", "%#{escape_sql_pattern word}%"
    end
  end

  def self.search(query)
    where("title LIKE ? OR body LIKE ?", "%#{query}%", "%#{query}%")
  end

  def self.order_by(order)
    case order
    when 'created_at_asc'
      order(created_at: :asc)
    when 'created_at_desc'
      order(created_at: :desc)
    when 'title_asc'
      order(title: :asc)
    when 'title_desc'
      order(title: :desc)
    else
      order(created_at: :desc)
    end
  end

  private

  def self.escape_sql_pattern(pattern)
    pattern.gsub(/[%_\\]/, '\\\\\\&')
  end
end
