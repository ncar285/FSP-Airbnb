class Api::ReviewsController < ApplicationController

    def create 
        @review = Review.new(user_params)
        if @review.save 
            login(@user)
            render :show
        else 
            render json: @user.errors.full_messsages, status: 422
        end
    end

    def checkEmail
        email = params[:email]
        user = User.find_by(email: email)
        exists = user.present?
        render json: { exists: exists }
    end

    private 
    def review_params 
        params.require(:review).permit(:listing_id, :author_id, :body, :cleanliness, :communication, :checkin, :accuracy, :location, :value)
    end


end
