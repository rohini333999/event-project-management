

class Api::V1::UsersController < ApplicationController
  def index
    allUsers = User.all
    render json: allUsers, status: 200
    
  end

  def show
      @request_params = params
  end
  

  def create
    
    newuser = User.new(
      fullname: user_params[:fullname],
      email: user_params[:email],
      password: user_params[:password],
      confirmPassword:user_params[:confirmPassword]
    )
    
    if newuser.save
      render json:params
      # render json: user, status: 200
    else
      render json: {
        error: "Error creating"
      }
    end
  end

  def update
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit([
      :fullname,
      :email,
      :password,
      :confirmPassword
    ])
  end
end
