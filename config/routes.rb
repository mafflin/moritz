Rails.application.routes.draw do
  namespace :api do
    namespace :v2, defaults: { format: :json } do
      resource :groups, only: [] do
        post :create_single
        post :delete_single
        post :fetch_list
        post :fetch_single
        post :update_single
      end

      resource :imports, only: [] do
        post :fetch_list
        post :create_single
      end

      resource :payments, only: [] do
        post :fetch_list
        post :fetch_search_results
        post :fetch_single
        post :update_single
      end

      resource :rules, only: [] do
        post :create_single
        post :delete_single
        post :fetch_list
      end

      resource :sessions, only: [] do
        post :create_current
        post :delete_current
      end

      resource :settings, only: [] do
        post :fetch_current
        post :update_current
      end

      resource :summaries, only: [] do
        post :fetch_list
      end

      resource :users, only: [] do
        post :create_single
        post :fetch_current
        post :update_current
      end
    end
  end
end
