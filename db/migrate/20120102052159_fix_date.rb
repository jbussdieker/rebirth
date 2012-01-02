class FixDate < ActiveRecord::Migration
  def up
    remove_column :transactions, :date
    add_column :transactions, :date, :date
  end
end
