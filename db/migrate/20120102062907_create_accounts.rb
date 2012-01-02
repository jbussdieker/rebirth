class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.text :caption

      t.timestamps
    end
  end
end
