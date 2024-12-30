Rails.application.routes.draw do
  root 'notes#index'

  resources :notes, path: '', except: [:index] do
    collection do
      get '', to: 'notes#index', as: :root
    end
  end
end
