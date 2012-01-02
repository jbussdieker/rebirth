class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :caption
      t.integer :invert
      t.references :element

      t.timestamps
    end

    add_index :categories, :element_id
  end
end
