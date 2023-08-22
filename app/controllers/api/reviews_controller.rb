class Api::ReviewsController < ApplicationController

    def create 

        puts review_params

        @review = Review.new(review_params)

        puts @review

        if @review.save 
            # return @review
            render :show
        else 
            puts @review.errors.full_messages
            render json: @review.errors.full_messages, status: 422
        end
    end

    private 
    def review_params 
        params.require(:review).permit(:listing_id, :author_id, :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value)
    end


end


listing = {listing_id: 8, author_id: 1, body: 'yo yo test', cleanliness: 4, communication: 4, lsting_id: 8, location: 4, value: 4 }