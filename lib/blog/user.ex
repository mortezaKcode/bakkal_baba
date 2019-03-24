defmodule Blog.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string
    has_many :orders,Blog.Order

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> validate_length(:name,min: 3,message: "لطفا مقدار بیشتری برای نام واردکنید")
  end
end
