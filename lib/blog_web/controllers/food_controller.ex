defmodule BlogWeb.FoodController do
    use BlogWeb,:controller
    alias Blog.Food
    alias Blog.Repo
    import Ecto.Query
    plug :scrub_params ,"curser" when action in [:all_foods]
    def create_food(conn,params) do
        foodChangeset = Food.changeset(%Food{},params)
        case Repo.insert(foodChangeset) do
            {:ok,_success} ->
                text conn,"okay"
            {:error,_fail} ->
                text conn,"can't create the user sorry"
            end
    end

    def all_foods(conn,%{"curser" => curser} = params) do
        q = from f in Food,offset: ^curser,limit: 5,order_by: [asc: f.id],select: %{id: f.id,name: f.name,price: f.price}
        foods = q |> Repo.all() |> Jason.encode!()
        json conn,foods
    end

    def get_foods(conn,_params) do
       q = from f in Food,select: %{"id" => f.id,"name" => f.name,"price" => f.price}
       foods = Repo.all(q)
       json conn,Jason.encode!(foods) 
    end
    def foods_count(conn,_params) do
        count = Repo.aggregate Food,:count,:name
        json conn,Jason.encode!(count)
    end

    def get_food(conn,%{"id" => id} = param) do
        case food = Repo.get(Food,id) do
            %Blog.Food{name: name,price: price} =food->
                food = Jason.encode!(%{"res" => "okay","name" => food.name,"id" => id,"price" => price})
                json conn,food
            _ -> 
                json conn ,"null "
        end
    end
    def update_food(conn,%{"name" => name,"id" => id,"price" => price} = params) do
        food = Repo.get Food,id
        case food do
            nil -> 
                json conn,Jason.encode! %{"res" => "error","msg" => "کالا پیدا نشد"}
            food_got ->
                change = Food.changeset(food_got,%{name: name,price: price})
                case Repo.update(change) do
                    {:ok,_success} ->
                        json conn,Jason.encode! %{"res" => "ok","msg" => "کالا با موفقیت ویرایش شد"}
                    {:error,_fail} ->
                        json conn,Jason.encode! %{"res" => "erorr","msg" => "کالا ویرایش نشد !"}
                end
        end
    end

    def delete_food(conn,%{"id" => id} = params) do
        case Repo.get(Food,id) do
            nil -> 
                json conn,Jason.encode!(%{"res" => "error","msg" => "چنین کالایی وجود ندارد"})
            food ->
                    case Repo.delete(food) do
                        {:ok,_deleted} ->
                            json conn,Jason.encode!(%{"res" => "ok","msg" => "با موفقیت حذف شد"})
                        {:error,_fail} ->
                            json conn,Jason.encode!(%{"res" => "error","msg" => "حذف نشد دوباره امتحان کنید"})
                    end    
        end
    end

end