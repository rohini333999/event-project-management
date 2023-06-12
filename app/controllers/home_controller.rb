class HomeController < ApplicationController
    def home
        begin
        @userId = cookies[:login_user] 
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
            @allEvents = Event.where(start_date: Date.current.beginning_of_week..(Date.current.end_of_week))
        end
        if params[:filter] == "this-week"
            @allEvents = Event.where(start_date: Date.current.beginning_of_week..(Date.current.end_of_week))
        end
       rescue => e
        render json: { error: e }, status: :unprocessable_entity
      end
   
    end

    def sort
        @sortParams = params[:sort]
        
        if params[:sort] == 'entry-fee'
            events = Event.all
            @allEvents = events.order(entry_fee: :asc)
             partial = render_to_string(partial: "home/event_list")
            render json: { success: true, events: partial }
        end
        if params[:sort] == 'date'
            events = Event.all
            @allEvents = events.order(start_date: :asc)
             partial = render_to_string(partial: "home/event_list")
            render json: { success: true, events: partial }
        end
        
    end 

    private
    def sort_params 
        params.require(:sort).permit(:sort)
    end

end
 # render partial: "home/event_list", locals: { allEvents: @allEvents }