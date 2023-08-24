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
            render json: @booking.errors.full_messsages, status: 422
        end
    end
    

    def update
        @booking = Booking.find_by(id: params[:id])
        if @booking && current_user? && @booking.update(booking_params)
            render :show 
        else
            render json: @booking.errors.full_messages, status: 422
        end
    end

    def destroy
        @booking = Booking.find_by(id: params[:id])
        if @booking 
            @booking.destroy 
        else
            render @booking.errors.full_messages
        end
    end

    private 
    def booking_params 
        params.require(:booking).permit(:user_id, :listing_id, :start_date, :end_date, :guests)
    end
    

    
end
