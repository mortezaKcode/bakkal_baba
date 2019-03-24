defmodule Blog.Order do
  use Ecto.Schema
  import Ecto.Changeset


  schema "orders" do
    field :count, :integer
    field :name, :string
    field :price, :float
    field :date,:utc_datetime
    belongs_to :user,Blog.User
  end

  @doc false
  def changeset(order, attrs) do
    order
    |> cast(attrs, [:count, :price, :name])
    |> validate_required([:count, :price, :name])
    |> validate_length(:name,min: 0,message: "نام را وارد کنید")
    |> validate_number(:count,greater_than: 0,message: "لطفا تعداد سفارش را انتخاب کنید")
    |> validate_number(:price,greater_than: 0,message: "قیمت کالا صحیح نیست")
  end
end
