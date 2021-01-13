module Locations
  class CreateService < ApplicationService
    attr_accessor :payment, :query, :features

    def initialize(payment, attributes)
      @payment = payment
      @query = attributes[:query].join('+').downcase
      @features = attributes[:features]
    end

    def perform
      location = Location.new(
        query: query,
        features: features,
        user: payment.user,
      )

      payment.update(location: location, geocoded: true) if location.save
    end
  end
end
