require 'json'
require 'rest-client'

module Locations
  class GeocodeService < ApplicationService
    def initialize(geo_query)
      @query = geo_query
    end

    def perform
      return if !geo_service_enabled
      return if !@query || !gecoding.present?

      ActiveSupport::HashWithIndifferentAccess.new(gecoding)
    end

    private

    def url
      @url ||= "https://api.mapbox.com/geocoding/v5/mapbox.places/#{CGI.escape(@query)}.json"
    end

    def gecoding
      @response ||= RestClient.get(url, { params: { access_token: geo_service_access_token } })

      return if !@response.code == 200

      @gecoding ||= JSON.parse(@response.body)
    end
  end
end
