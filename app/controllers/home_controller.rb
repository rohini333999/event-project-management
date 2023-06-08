class HomeController < ApplicationController
    def home
        @allEvents = Event.all
    end
end
