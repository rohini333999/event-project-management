class EventsController < ApplicationController
    def events
      @singleEvent = Event.find_by(id: params[:id])
      
    end
end
