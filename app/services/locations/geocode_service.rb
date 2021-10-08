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

    def endpoint
      @endpoint ||= "#{geo_service_url}#{CGI.escape(@query)}.json"
    end

    def gecoding
      @response ||= RestClient.get(
        endpoint,
        { params: { access_token: geo_service_access_token } },
      )

      return if !@response.code == 200

      @gecoding ||= JSON.parse(@response.body)
    end
  end
end
