class ImportService < ApplicationService
  def initialize(user)
    @user = user
  end

  def perform
    reports.each { |report| create_payments(report) }
  end

  private

  def reports
    Reports::LoadService.new.perform
  end

  def create_payments(report)
    report.each { |entry| Payments::CreateService.new(@user, entry).perform }
  end
end
