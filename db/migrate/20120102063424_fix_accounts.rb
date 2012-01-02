class FixAccounts < ActiveRecord::Migration
  def up
    remove_column :accounts, :caption
    add_column :accounts, :caption, :string
  end
end
