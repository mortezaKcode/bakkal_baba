defmodule Blog.Food do
  use Ecto.Schema
  import Ecto.Changeset


  schema "foods" do
    field :name, :string
    field :price, :float

    timestamps()
  end

  @doc false
  def changeset(food, attrs) do
    food
    |> cast(attrs, [:name, :price])
    |> validate_required([:name, :price],message: "لطفا داده ها رو وارد کنید")
    |> unique_constraint(:name,message: "این نام قبلاً استفاده شده است")
    |> validate_length(:name,min: 2)
  end
end
