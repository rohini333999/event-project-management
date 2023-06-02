Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#home"
  get "signup" => "frontend#signup"
  get "login" => "login#login"
  get "addevent" => "addevent#addevent"
  
  resources :events
 
end
