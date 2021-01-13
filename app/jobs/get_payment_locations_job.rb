class GetPaymentLocationsJob < ApplicationJob
  queue_as :default

  def perform(payment)
    return if payment.geocoded

    if existing = Location.find_by(original_query: payment.geo_query, user: payment.user)
      payment.update(
        location: existing,
        geocoded: true,
      )
      return
    end

    geocoding = Locations::GeocodeService.new(payment).perform

    unless geocoding
      payment.update(geocoded: true)
      return
    end

    Locations::CreateService.new(payment, geocoding).perform
  end
end
