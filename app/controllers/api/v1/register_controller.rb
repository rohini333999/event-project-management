class Api::V1::RegisterController < ApplicationController
  def index
    allRegister = Register.all
    render json: allRegister, status: 200
  end

  def show
  end
   
  def create
    register = Register.new({
      users_id: register_params[:users_id],
      events_id: register_params[:events_id]
    })
    if register.save
      render json: register, status:200
    else 
      render json: {
        error:"Error in creating.."
      }
    end
  end

  def update
  end

  def destroy
  end

  private
  def register_params 
    params.require(:register).permit([
      :users_id,
      :events_id
    ])
    
  end

end
