require "sidekiq/web"

Rails.application.routes.draw do
  devise_for :users
  mount Sidekiq::Web => "/sidekiq"

  namespace :api do
    namespace :v1 do
      resources :appointments, only: %i[create]
    end
  end
end
