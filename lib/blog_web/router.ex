defmodule BlogWeb.Router do
  use BlogWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BlogWeb do
    pipe_through :browser

    get "/", PageController, :index
    post "/createfood",FoodController,:create_food
    get "/foods",FoodController,:all_foods
    get "/foodscount",FoodController,:foods_count
    get "/getfood",FoodController,:get_food
    post "/updatefood",FoodController,:update_food
    post "/deletefood",FoodController,:delete_food
    post "/createuser",UserController,:create_user
    get "/getfoods",FoodController,:get_foods
    post "/makeorder",OrderController,:make_order
  end

  # Other scopes may use custom stacks.
  # scope "/api", BlogWeb do
  #   pipe_through :api
  # end
end
