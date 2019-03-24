defmodule Blog.Repo.Migrations.CreateOrders do
  use Ecto.Migration

  def change do
    create table(:orders) do
      add :count, :integer
      add :price, :float
      add :name, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :date, :utc_datetime
    end

    create index(:orders, [:user_id])
  end
end
