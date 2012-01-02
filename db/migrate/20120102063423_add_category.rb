class AddCategory < ActiveRecord::Migration
  def up
    add_column :accounts, :category_id, :integer
    add_index :accounts, :category_id
  end
  def down
    remove_index :accounts, :category_id
    remove_column :accounts, :category_id
  end
end
