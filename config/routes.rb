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

    namespace :v2, defaults: { format: :json } do
      resource :users, only: [] do
        post :list
        post :show_current
      end

      resource :sessions, only: [] do
        post :start
        post :delete
      end
    end
  end
end
