class RefugeesController < ApplicationController

  def countries

  end

  def post
    originx = Refugee.pluck(:country_of_origin)
    latlong = HTTParty.get('https://restcountries.eu/rest/v2/name/brazil', :headers =>{'Content-Type' => 'application/json'})
  end

  def index
  render json: Refugee.all
  
end

def show
  render json: Refugee.find_by(id: params[:id])
end

def create
  refugee = Refugee.new(country_of_origin: params[:country_of_origin],
                     country_of_asylum: params[:country_of_asylum],
                     refugees: params[:refugees])
                     render json: {status: "create successful"}
end

def destroy
  Refugee.destroy(params[:id])
  render json: {status: "delete successful"}
end

def update
  refugee = Refugee.update(params[:id],
                        country_of_origin: params[:country_of_origin],
                        country_of_asylum: params[:country_of_asylum],
                        refugees: params[:refugees])
                        render json: {status: "update successful"}
end

def search
  if params[:type] == "country_of_origin"
    result = Refugee.where("country_of_origin ILIKE ?", "%#{params[:query]}%")
  elsif params[:type] == "country_of_asylum"
    result = Refugee.where("country_of_asylum ILIKE?", "%#{params[:query]}%")
  else
    result = "please specify contry of origin or asylum in your 'type' parameter"
  end
  render json: {result: result}
end
end
