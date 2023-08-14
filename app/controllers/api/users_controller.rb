class Api::UsersController < ApplicationController

    wrap_parameters include: User.attribute_names + ['password']
    
    def

    end
    
    def create 
        @user = User.new(user_params)
        if @user.save 
            login(@user)
            render :show
        else 
            render json: @user.errors.full_messsages, status: 422
        end
    end

    private 
    def user_params 
        params.require(:user).permit(:email, :firstname, :lastname, :password)
    end
end
