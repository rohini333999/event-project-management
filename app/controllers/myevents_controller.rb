class MyeventsController < ApplicationController
    def myevents
        # @allRegister = Register.all
        

        event_ids= [1,2,3,4]
        puts "event_ids"
        @events = Event.where(id: event_ids)
       
    end
end
