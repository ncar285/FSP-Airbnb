class Api::BookingsController < ApplicationController
    

    def show 
        @booking = Booking.find_by(id: params[:id])
        if @booking 
            render :show
        else
            render json: { booking: nil }
        end
    end


    def create 
        @booking = Booking.new(booking_params)
        if @booking.save
            render :show
        else 
            render json: @booking.errors.full_messages, status: 422
        end
    end
    

    def update
        @booking = Booking.find_by(id: params[:id])
        if @booking && current_user && @booking.update(booking_params)
            render :show 
        else
            render json: @booking.errors.full_messages, status: 422
        end
    end

    def destroy
        @booking = Booking.find_by(id: params[:id])
        if @booking 
            @booking.destroy 
            head :no_content
        else
            # render @booking.errors.full_messages
            render json: {error:"No booking found"}, status: 404
        end
    end

    private 
    def booking_params 
        params.require(:booking).permit(:id, :user_id, :listing_id, :start_date, :end_date, :guests)
    end
    

    
end
