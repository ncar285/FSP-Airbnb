class Api::SessionsController < ApplicationController

    before_action :require_logged_in, only: [:destroy]
    # before_action :require_logged_out, only: [:create]

    def show 
        @user = current_user
        if @user 
            render 'api/users/show'
        else
            render json: { user: nil }
        end
    end

    # if there is a current_user: render current_user as JSON, under a top-level key of user
    #     if there is not a current_user: render { user: nil } as JSON

    def create 
        email = params[:email]
        password = params[:password]
        @user = User.find_by_credentials(email, password)

        # debugger

        if @user
            login(@user)
            render 'api/users/show'
        else 
            render json: {errors: ['Invalid credentials']}, status: :unauthorized
        end
    end

#     pass the credentials from the request body, stored under top level keys of credential and password, to User::find_by_credentials; save the result to @user
# if a user with matching credentials was found (i.e., @user is truthy):
# login @user
# render @user as JSON, under a top-level key of user
# if no user was found (i.e., @user is falsey):
# render { errors: ['The provided credentials were invalid.'] } as JSON, with a status of :unauthorized

    def destroy
        logout
        head :no_content
    end

    # log out the current_user, if one exists
    # render { message: 'success' } as JSON


end
