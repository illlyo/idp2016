Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :refugees
  get "/refugees/search/:query", to: "refugees#search"
end
