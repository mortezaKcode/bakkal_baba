defmodule BlogWeb.OrderController do
    use BlogWeb,:controller
    alias Blog.{Repo,Order,User}
    import Ecto.Query
    def make_order(conn,%{"orders" => orders,"userId" => userID}=params) do
        userID = String.to_integer(userID)
        #user = limit(Order,1) |> Repo.get_by(user_id: userID)
        Repo.delete_all from o in Order,where: o.user_id == ^userID
        dateTime = DateTime.utc_now(Jalaali.Calendar) |> DateTime.truncate(:second)
        foods = Enum.map orders,fn {x,f} -> 
            count = String.to_integer(f["count"])
            {price,_x} = Float.parse(f["price"])
            name = f["name"]
            user_id = userID
            %{count: count,price: price,name: name,user_id: user_id,date: dateTime}
        end
        #start
        err = try do
            Repo.insert_all Order,foods
            "ok"
        rescue
            x  -> "error"
        end
        #end
        json conn,%{"res"=> err} 
    end

    def make_order(conn,_params) do
        json conn,%{"res" => "error","msg" => "lutfe kashinma ve field'leri doldur"}
    end
end