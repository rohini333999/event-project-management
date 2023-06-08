class Api::V1::EventsController < ApplicationController
  def index
    allEvents = Event.all
    render json: allEvents, status: 200
    
  end

  def show
    eventId = Event.find(params[:id])
    render json: eventId, status: 200

    # event_ids = params[:event_ids] # Access the event_ids array from the request parameters
    
    # events = Event.where(id: event_ids)
    # render json: events, status:200
  end

  def create
    event = Event.new(
      event_name: event_params[:event_name],
      description: event_params[:description],
      location: event_params[:location],
      location_url: event_params[:location_url],
      entry_fee: event_params[:entry_fee],
      category: event_params[:category],
      seats: event_params[:seats],
      start_date: event_params[:start_date],
      start_time: event_params[:start_time],
      end_date: event_params[:end_date],
      end_time: event_params[:end_time],
      users_id: event_params[:users_id]
    )

    if event.save
      render json: event, status: 200
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
  def event_params
    params.require(:event).permit([
      :event_name,
      :description,
      :location,
      :location_url,
      :entry_fee,
      :category,
      :seats,
      :start_date,
      :start_time,
      :end_date,
      :end_time,
      :users_id
    ])
  end
end
