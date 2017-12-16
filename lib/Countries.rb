require 'httparty'

class Countries
  include HTTParty
  format :json

  base_uri 'restcountries.eu/rest/v2/name/'

  def initialize

  end

  def self.get_coords_origin()
    origin = Refugee.pluck(:country_of_origin)
    origin.each { |c| puts (response = ("restcountries.eu/rest/v2/name/#{c}"))}
    if response.success?
      Refugee.update(origin_coordinates_x: reponse.latlng.[0], origin_coordinates_y: reponse.latlng.[1])
  end

end
