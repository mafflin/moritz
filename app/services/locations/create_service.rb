module Locations
  class CreateService < ApplicationService
    attr_accessor :payment, :query, :features

    def initialize(payment, attributes)
      @payment = payment
      @query = attributes[:query].join(Payment::QUERY_SEPARATOR)
      @features = attributes[:features]
    end

    def perform
      location = Location.new(
        features: features,
        query: query,
        original_query: payment.geo_query,
        user: payment.user,
      )

      payment.update(location: location, geocoded: true) if location.save
    end
  end
end
