require 'json'
require 'rest-client'

module Locations
  class GeocodeService < ApplicationService
    attr_accessor :query

    def initialize(payment)
      @query = payment.geo_query
    end

    def perform
      return if !geo_service_enabled || !access_token.present?
      return if !query || !gecoding.present?

      ActiveSupport::HashWithIndifferentAccess.new(gecoding)
    end

    private

    def url
      @url ||= "https://api.mapbox.com/geocoding/v5/mapbox.places/#{CGI.escape(query)}.json"
    end

    def gecoding
      @response ||= RestClient.get(url, { params: { access_token: access_token } })

      return unless @response.code == 200

      @gecoding ||= JSON.parse(@response.body)
    end

    def access_token
      @access_token ||= ENV.fetch('VUE_APP_MAPBOX_TOKEN')
    end

    def geo_service_enabled
      @geo_service_enabled ||= ENV.fetch('VUE_APP_GEO_SERVICE') === 'true'
    end
  end
end
