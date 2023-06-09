class MyeventsController < ApplicationController
    def myevents
        loginUser = cookies[:user_id]
        @userId = cookies[:user_id]
        @event_ids = Register.where(users_id: loginUser).pluck(:events_id)
        @events = Event.where(id: @event_ids)
    end
end
