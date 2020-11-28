module Users
  class UpdateService < ApplicationService
    def initialize(user:, params:)
      @user = user
      @avatar_base_64 = params[:avatar]
    end

    def perform
      return false unless @avatar_base_64

      update_avatar
    end

    private

    def update_avatar
      meta, *, image = @avatar_base_64.split(';base64,')
      type, * = meta.split('data:')

      image && type && @user.avatar.attach(
        io: StringIO.new(Base64.decode64(image)),
        filename: SecureRandom.urlsafe_base64,
        content_type: type,
      )
    end
  end
end
