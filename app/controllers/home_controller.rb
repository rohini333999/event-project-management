class HomeController < ApplicationController
    def home
        @userId = cookies[:user_id] 
        @allEvents = Event.all

        @filterParams = params[:filter]
        @sortParams = params[:sort]
        
        if params[:filter] == "today"
            @allEvents = Event.where(start_date: Date.today)
        end
        if params[:filter] == "tomorrow"
            @allEvents = Event.where(start_date: Date.tomorrow)
        end
        if params[:filter] == "today|tomorrow"
            @allEvents = Event.where(start_date: Date.today..(Date.tomorrow))
        end
        if params[:filter] == "today|tomorrow|this-week"
            @allEvents = Event.where(start_date: Date.current.beginning_of_week..Date.current.end_of_week)
        end
        if params[:sort] == 'entry-fee'
            @allEvents = @allEvents.order(entry_fee: :asc)
          end
        if params[:sort] == "date"
            @allEvents = @allEvents.order(start_date: :asc)
        end
    end
end
