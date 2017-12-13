class CaseChangeForTables < ActiveRecord::Migration[5.1]
  def change
    rename_column :refugees, :countryOfOrigin, :country_of_origin
    rename_column :refugees, :countryOfAsylum, :country_of_asylum
  end
end
