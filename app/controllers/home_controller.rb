class HomeController < ApplicationController
    def home
        begin
        @userId = cookies[:login_user] 
        @allEvents = Event.all
        
       rescue => e
        render json: { error: e }, status: :unprocessable_entity
      end
   
    end

    def sort
        @sortParams = params[:sort]
        @allEvents = Event.all


        if params[:filter] == "this-week"
            @allEvents = Event.where(start_date: Date.current.beginning_of_week..(Date.current.end_of_week))
        end
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
        if params[:sort] == 'entry-fee'
            @allEvents = @allEvents.order(entry_fee: :asc)      
        end
        if params[:sort] == 'date'
            @allEvents = @allEvents.order(start_date: :asc)
        end
        partial = render_to_string(partial: "home/event_list")
            render json: { success: true, events: partial }
        
    end 

    def filter
        if params[:filter] == "this-week"
            @allEvents = Event.where(start_date: Date.current.beginning_of_week..(Date.current.end_of_week))

            partial = render_to_string(partial: "home/event_list")
            render json: { success: true, events: partial }
        end
        if params[:filter] == "today"
            @allEvents = Event.where(start_date: Date.today)

            partial = render_to_string(partial: "home/event_list")
            render json: { success: true, events: partial }
        end
        if params[:filter] == "tomorrow"
            @allEvents = Event.where(start_date: Date.tomorrow)

            partial = render_to_string(partial: "home/event_list")
            render json: { success: true, events: partial }
        end
        if params[:filter] == "today|tomorrow"
            @allEvents = Event.where(start_date: Date.today..(Date.tomorrow))

            partial = render_to_string(partial: "home/event_list")
            render json: { success: true, events: partial }
        end
        if params[:filter] == "today|tomorrow|this-week"
            @allEvents = Event.where(start_date: Date.current.beginning_of_week..(Date.current.end_of_week))
            
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