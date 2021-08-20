module GeoTraceable
  extend ActiveSupport::Concern

  # TODO: move to DB.
  GEOTRACEABLE_TYPES = [
    'Debit Card Payment',
    'MasterCard Payment',
  ]
  # TODO: move to DB.
  NON_GEOTRACEABLE_MATCH = [
    'account statement',
    'amzn',
    'amazon',
    'google',
    'income',
    'onlin',
    'paypal',
  ]
  QUERY_SEPARATOR = '+'

  def geo_traceable?
    GEOTRACEABLE_TYPES.include?(transaction_type) && !NON_GEOTRACEABLE_MATCH.any? do |word|
      [beneficiary, details].join.downcase.include?(word)
    end
  end

  def geo_query
    return unless geo_traceable?

    @geo_query ||= case bank
    when Payment::BANKS[:n26]
      beneficiary
    when Payment::BANKS[:db]
    when Payment::BANKS[:revolut]
      details
    end

    @geo_query&.downcase
      .gsub(/[^A-Za-z]/, ' ')
      .split(' ')
      .join(QUERY_SEPARATOR)
  end
end
