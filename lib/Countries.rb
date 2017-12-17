

class Countries
  require 'httparty'
  @@base_uri = 'restcountries.eu/rest/v2/name/'

  def grab_coords(country)
    response = HTTParty.get("#{@@base_uri}#{country}")
    p response.parsed_response[0]['latlng'][0]
    p response.parsed+response[0]['latlng'][1]
  end

  def self.get_coords_origin()
    origin = Refugee.pluck(:country_of_origin)
    origin.each { |c| puts (response = ("restcountries.eu/rest/v2/name/#{c}"))}
    if response.success?
      Refugee.update(origin_coordinates_x: reponse.latlng.[0], origin_coordinates_y: reponse.latlng.[1])
  end

end
