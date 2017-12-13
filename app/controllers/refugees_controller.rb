class RefugeesController < ApplicationController
  def index
  render json: Refugee.all
end

def show
  render json: Refugee.find_by(id: params[:id])
end

def create
  refugee = Refugee.new(countryOfOrigin: params[:countryOfOrigin],
                     countryOfAsylum: params[:countryOfAsylum],
                     refugees: params[:refugees])
                     render json: {status: "create successful"}
end

def destroy
  Refugee.destroy(params[:id])
  render json: {status: "delete successful"}
end

def update
  refugee = Refugee.update(params[:id],
                        countryOfOrigin: params[:countryOfOrigin],
                        countryOfAsylum: params[:countryOfAsylum],
                        refugees: params[:refugees])
                        render json: {status: "update successful"}
end

def search
  if params[:type] == "countryOfOrigin"
    result = Refugee.where("countryOfOrigin ILIKE ?", "%#{params[:query]}%")
  elsif params[:type] == "countryOfAsylum"
    result = Refugee.where("countryOfAsylum ILIKE?", "%#{params[:query]}%")
  else
    result = "please specify contry of origin or asylum in your 'type' parameter"
  end
  render json: {result: result}
end
end
