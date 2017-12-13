class CreateRefugees < ActiveRecord::Migration[5.1]
  def change
    create_table :refugees do |t|
      t.string :countryOfOrigin
      t.integer :refugees
      t.string :countryOfAsylum

      t.timestamps
    end
  end
end
