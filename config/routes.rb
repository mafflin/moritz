Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show]
      resources :payments, only: [:index]
      resources :groups, only: [:index, :create, :update, :destroy]
      resources :reports, only: [:create]
    end
  end
end
