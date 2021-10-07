Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :groups, only: [:index, :show, :create, :update, :destroy]
      resources :payments, only: [:index, :show, :update]
      resources :reports, only: [:create]
      resources :rules, only: [:index, :show, :create, :destroy]
      resources :summaries, only: [:index]
      resources :users, only: [:index, :show, :update]

      resources :sessions, only: [:create] do
        delete :destroy, on: :collection
      end
    end
  end
end
