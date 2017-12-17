class Refugee < ApplicationRecord

  def grab_coords(country)
    require 'httparty'
    response = HTTParty.get("http://restcountries.eu/rest/v2/name/#{country}")
    p response.parsed_response[0]['latlng'][0]
    p response.parsed_response[0]['latlng'][1]
  end
end
