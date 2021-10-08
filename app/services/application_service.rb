class ApplicationService
  protected

  def geo_service_url
    @geo_service_url ||= ENV.fetch('VUE_APP_GEO_SERVICE_URL')
  end

  def geo_service_access_token
    @geo_service_access_token ||= ENV.fetch('VUE_APP_MAPBOX_TOKEN')
  end

  def geo_service_enabled
    @geo_service_enabled ||= geo_service_access_token.present? &&
      geo_service_url.present? &&
      ENV.fetch('VUE_APP_GEO_SERVICE') === 'true'
  end
end
