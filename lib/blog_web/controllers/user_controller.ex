defmodule BlogWeb.UserController do
    use BlogWeb,:controller
    alias Blog.{Repo,User}

    def create_user(conn,%{"name" => name} = params) do
        changeset = User.changeset %User{},%{name: name}
        case Repo.insert(changeset) do
            {:ok,success} ->
                json conn,Jason.encode!(%{"res" => "ok","name" => success.name,"id" => success.id})
            {:error,_fail} ->
                :fail
        end
    end
end