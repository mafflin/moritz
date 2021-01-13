require 'json'
require 'rest-client'

module Locations
  class GeocodeService < ApplicationService
    attr_accessor :query

    ACCESS_TOKEN = ENV['VUE_APP_MAPBOX_TOKEN']

    def initialize(payment)
      @query = payment.geo_query
    end

    def perform
      return if !query || !gecoding.present?

      ActiveSupport::HashWithIndifferentAccess.new(gecoding)
    end

    private

    def url
      @url ||= "https://api.mapbox.com/geocoding/v5/mapbox.places/#{CGI.escape(query)}.json"
    end

    def gecoding
      @response ||= RestClient.get(url, { params: { access_token: ACCESS_TOKEN } })

      return unless @response.code == 200

      @gecoding ||= JSON.parse(@response.body)
    end
  end
end
