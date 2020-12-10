module Users
  class UpdateService < ApplicationService
    def initialize(user:, params:)
      @user = user
      @avatar_base64 = params[:avatar_base64]
    end

    def perform
      return false unless @avatar_base64

      update_avatar
    end

    private

    def update_avatar
      meta, *, image = @avatar_base64.split(';base64,')
      type, * = meta.split('data:')

      return false unless image && type

      @user.avatar.purge
      @user.avatar.attach(
        io: StringIO.new(Base64.decode64(image)),
        filename: SecureRandom.urlsafe_base64,
        content_type: type,
      )
    end
  end
end
