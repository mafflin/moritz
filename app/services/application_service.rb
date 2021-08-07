class ApplicationService
  protected

  def geo_service_enabled
    @geo_service_enabled ||= ENV.fetch('MORITZ_GEO_SERVICE') === 'true'
  end
end
