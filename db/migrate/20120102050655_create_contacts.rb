class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :caption

      t.timestamps
    end
  end
end
