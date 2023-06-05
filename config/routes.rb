Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
     resources :users, only: [:index, :show, :create, :update , :destroy]
    end
  end
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#home"
  get "signup" => "frontend#signup"
  get "login" => "login#login"
  get "addevent" => "addevent#addevent"
  
 

end
