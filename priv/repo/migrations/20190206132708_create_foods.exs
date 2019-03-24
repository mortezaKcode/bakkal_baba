defmodule Blog.Repo.Migrations.CreateFoods do
  use Ecto.Migration

  def change do
    create table(:foods) do
      add :name, :string
      add :price, :float

      timestamps()
    end

    create unique_index(:foods, [:name])
  end
end
