class AddDate < ActiveRecord::Migration
  def up
    add_column :transactions, :date, :datetime
  end
  def down
    remove_column :transactions, :date
  end
end
