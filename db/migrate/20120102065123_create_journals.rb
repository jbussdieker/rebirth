class CreateJournals < ActiveRecord::Migration
  def change
    create_table :journals do |t|
      t.decimal :amount
      t.date :date
      t.string :memo
      t.references :transaction
      t.references :account

      t.timestamps
    end

    add_index :journals, :transaction_id
    add_index :journals, :account_id
  end
end
