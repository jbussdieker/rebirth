class AddContact < ActiveRecord::Migration
  def up
    add_column :transactions, :contact_id, :integer
    add_index :transactions, :contact_id
  end
  def down
    remove_index :transactions, :contact_id
    remove_column :transactions, :contact_id
  end
end
