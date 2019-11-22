Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :groups, only: [:index, :show, :create, :update, :destroy]
      resources :payments, only: [:index]
      resources :reports, only: [:create]
      resources :rules, only: [:create]
      resources :users, only: [:index, :show]
    end
  end
end
