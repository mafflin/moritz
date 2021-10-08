module Payments
  class GeocodeService < ApplicationService
    def initialize(payment)
      @payment = payment
    end

    def perform
      return if !geo_service_enabled
      return if payment.geocoded

      if existing = Location.find_by(original_query: @payment.geo_query, user: @payment.user)
        @payment.update(
          location: existing,
          geocoded: true,
        )
        return
      end

      geocoding = Locations::GeocodeService.new(@payment.geo_query).perform

      if !geocoding
        @payment.update(geocoded: true)
        return
      end

      ActiveRecord::Base.transaction do
        location = Locations::CreateService.new(@payment, geocoding).perform
        @payment.update(
          location: location,
          geocoded: true,
        )
      end

      broadcast_user_notification
    end

    private

    def broadcast_user_notification
      message = "Location found for payments: #{@payment.details}"

      ActionCable.server.broadcast(@payment.user.id,message)
    end
  end
end
