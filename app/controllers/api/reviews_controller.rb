class Api::ReviewsController < ApplicationController

    def create 
        @review = Review.new(review_params)
        if @review.save
            render :show
        else 
            render json: @review.errors.full_messages, status: 422
        end
    end

    def update
        @review = Review.find_by(id: params[:id])
        if @review && current_user? && @review.update(review_params)
            render :show 
        else
            render json: @review.errors.full_messages, status: 422
        end
    end

    def destroy
        @review = Review.find_by(id: params[:id])
        if @review 
            @review.destroy 
        else
            render @review.errors.full_messages
        end
    end


    private 
    def review_params 
        params.require(:review).permit(:listing_id, :author_id, :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value)
    end

    def current_user?
        return current_user == Review.find_by(id: params[:id]).author
    end


end


listing = {listing_id: 8, author_id: 1, body: 'yo yo test', cleanliness: 4, communication: 4, lsting_id: 8, location: 4, value: 4 }