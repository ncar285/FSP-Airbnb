class Api::ListingsController < ApplicationController

    before_action :require_logged_in, only: [:create, :destroy]
    # before_action :require_logged_out, only: [:create]


    def index
        @listings = Listing.all

        # debugger

        # debugger

        if params[:search]
            query = "%#{params[:search]}%"
            @listings = @listings.where(
              "tag_line ILIKE ? OR city ILIKE ? OR state ILIKE ?",
              query, query, query
            )
        end
        # if params[:search]
        #     @listings = @listings.where("title ILIKE '%#{params[:search]}'")
        # end
        render :index
    end

    def show 
        # @listing = Listing.includes(reviews: :user).find_by(id: params[:id])
        @listing = Listing.find_by(id: params[:id])
        if @listing 
            render 'api/listings/show'
        else
            render json: { lsting: nil }
        end
    end

    def create 
        @Listing = Listing.new(listing_params)
        if @listing.save 
            render :show
        else 
            render json: @listing.errors.full_messsages, status: 422
        end
    end

    private 
    def listing_params 
        params.require(:listing).permit(:owner_id, :title, 
            :description, :address, :postcode, :latitude, :longitude, 
            :price, :guests, :bedrooms, :beds, :baths, :pets)
    end




end
