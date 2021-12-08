class ImportJob < ApplicationJob
  queue_as :default

  def perform(user:, import:, report:)
    payments = Payments::ImportService.new(user, report).perform

    import.update(
      status: :finished,
      payments_total: payments.length,
      payments_created: payments.compact.length
    )
  rescue StandardError => e
    import.update(
      status: :failed,
      fail_message: e.message
    )
  ensure
    ImportsChannel.broadcast_to(
      user,
      ApplicationController.render(
        partial: 'api/v2/imports/import',
        locals: { import: import }
      )
    )
  end
end
