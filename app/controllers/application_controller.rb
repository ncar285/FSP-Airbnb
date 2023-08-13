class ApplicationController < ActionController::API
    # enable csrf protection
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception

    private 
    # convert keys in params camelCase to snake_case
    def snake_case_params 
        params.deep_transform_keys!(&:underscore)
    end

end
