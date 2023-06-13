class EventsController < ApplicationController
    def events
      @singleEvent = Event.find_by(id: params[:id])
      
       @checkRegister = Register.exists?(users_id: cookies[:user_id], events_id: @singleEvent.id)
       
    end
end
