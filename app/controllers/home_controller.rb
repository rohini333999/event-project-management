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
        @sortParams = params
        @allEvents = Event.all

     

        if params[:filter] == "This-week"
            @allEvents = Event.where(start_date: Date.current.beginning_of_week..(Date.current.end_of_week))
        end
        if params[:filter] == "Today"
            @allEvents = Event.where(start_date: Date.today)
        end
        if params[:filter] == "Tomorrow"
            @allEvents = Event.where(start_date: Date.tomorrow)           
        end
        if params[:filter] == "Today|Tomorrow"
            @allEvents = Event.where(start_date: Date.today..(Date.tomorrow))
        end
        if params[:filter] == "Today|Tomorrow|This-week"
            @allEvents = Event.where(start_date: Date.current.beginning_of_week..(Date.current.end_of_week))           
        end

        if params[:sort] == 'Entry-fee'
            @allEvents = @allEvents.order(entry_fee: :asc)      
        end
        if params[:sort] == 'Date'
            @allEvents = @allEvents.order(start_date: :asc)
        end

        if params[:search] != "undefined"
            searchTerm = params[:search]
            @allEvents = @allEvents.where("event_name LIKE ?", "%#{searchTerm}%")
        end

        partial = render_to_string(partial: "home/event_list")
        render json: { success: true, events: partial, params: params }
        
    end 

   

    private
    def sort_params 
        params.require(:sort).permit(:sort)
    end

end
 # render partial: "home/event_list", locals: { allEvents: @allEvents }