class AddUniqueIndexToNotesTitle < ActiveRecord::Migration[6.1]
  def change
    add_index :notes, :title, unique: true
  end
end
