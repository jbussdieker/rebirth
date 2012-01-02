class CreateElements < ActiveRecord::Migration
  def change
    create_table :elements do |t|
      t.string :caption
      t.integer :invert

      t.timestamps
    end
  end
end
