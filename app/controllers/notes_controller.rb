class NotesController < ApplicationController
  before_action :set_note, only: %i[ show edit update destroy ]
  def index
    order = params[:order] || 'created_at_desc'
    @notes_by_month = Note.order_by(order).group_by { |note| note.created_at.beginning_of_month }

    filters = params[:filters]&.to_unsafe_h&.symbolize_keys
    if filters && filters[:title].present?
      @notes_by_month = @notes_by_month.transform_values do |notes|
        notes.select { |note| note.title.include?(filters[:title]) }
      end
    end
    
    @notice = I18n.t('notices.note_created')
  end

  def show
  end

  def new
    @note = Note.new
  end

  def edit
  end

  def create
    @note = Note.new(note_params)
    @note.created_at = params[:note][:local_created_at] if params[:note][:local_created_at].present?

    respond_to do |format|
      if @note.save
        format.html { redirect_to notes_url(new_note_id: @note.id), notice: I18n.t('notices.note_created') }
        format.json { render :show, status: :created, location: @note }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @note.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @note.update(note_params)
        format.html { redirect_to note_url(@note), notice: I18n.t('notices.note_updated')}
        format.json { render :show, status: :ok, location: @note }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @note.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @note.destroy
    respond_to do |format|
      format.html { redirect_to notes_url, notice: I18n.t('notices.note_destroyed') }
      format.json { head :no_content }
    end
  end

  private

  def set_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
