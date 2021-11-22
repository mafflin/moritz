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
      resource :groups, only: [] do
        post :fetch_list
        post :fetch_single
        post :create_single
        post :update_single
        post :delete_single
      end

      resource :payments, only: [] do
        post :fetch_list
        post :fetch_single
        post :update_single
      end

      resource :rules, only: [] do
        post :fetch_list
        post :create_single
        post :delete_single
      end

      resource :sessions, only: [] do
        post :create_current
        post :delete_current
      end

      resource :settings, only: [] do
        post :fetch_current
      end

      resource :users, only: [] do
        post :fetch_list
        post :fetch_current
        post :update_current
      end

      resource :reports, only: [] do
        post :create_single
      end
    end
  end
end
