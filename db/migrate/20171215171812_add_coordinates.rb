class AddCoordinates < ActiveRecord::Migration[5.1]
  def change
    add_column :refugees, :asylum_coordinates_x, :decimal
    add_column :refugees, :asylum_coordinates_y, :decimal
    add_column :refugees, :origin_coordinates_x, :decimal
    add_column :refugees, :origin_coordinates_y, :decimal
  end
end
