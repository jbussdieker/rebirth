class CreateTransactionMethods < ActiveRecord::Migration
  def change
    create_table :transaction_methods do |t|
      t.string :caption

      t.timestamps
    end
  end
end
