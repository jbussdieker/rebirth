class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.text :memo
      t.string :refnum
      t.references :transaction_method

      t.timestamps
    end

    add_index :transactions, :transaction_method_id
  end
end
