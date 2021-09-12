class GetPaymentLocationsJob < ApplicationJob
  queue_as :default

  def perform(payment)
    Payments::GeocodeService.new(payment).perform
  end
end
