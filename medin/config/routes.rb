require "sidekiq/web"

Rails.application.routes.draw do
  devise_for :users
  mount Sidekiq::Web => "/sidekiq"

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :appointments, only: %i[index create]
    end
  end
end
