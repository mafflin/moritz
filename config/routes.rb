Rails.application.routes.draw do
  get 'reports/create'
  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:create, :destroy]
      resources :users, only: [:index, :show]
      resources :payments, only: [:index]
      resources :groups, only: [:index, :create, :update, :destroy]
    end
  end
end
