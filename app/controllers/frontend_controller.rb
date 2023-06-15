class FrontendController < ApplicationController
    def signup
        if params[:email]
            userList = User.all.where(email: params[:email]).pluck(:email)
            render json: {success: true, result: userList}
        end
    end
    
    def home
    end

end
