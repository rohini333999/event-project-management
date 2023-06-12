Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
     resources :register, only: [:index, :show, :create, :update, :destroy]
     resources :events, only: [:index, :show, :create, :update, :destroy]
     resources :users, only: [:index, :show, :create, :update , :destroy]
    end
  end
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#home"
  get "/sort" => "home#sort"
  get "/filter" => "home#filter"
  get "signup" => "frontend#signup"

  get "login" => "login#login"
  get "addevent" => "addevent#addevent"
  get "/events/:id" => "events#events"
  get "myevents" => "myevents#myevents"
 
  get "/notfound" => "notfound#notfound"
end
