module Users
  class UpdateService < ApplicationService
    IMAGE_SIZE_LIMIT = 2.megabytes
    IMAGE_TYPES = [
      'image/jpeg',
      'image/png',
    ]

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
      meta, image = @avatar_base64.split(';base64,')
      *, type = meta.split('data:')
      decoded = Base64.decode64(image)

      raise StandardError.new('Unprocessable image!') unless image && type
      raise StandardError.new('Unsupported image format!') unless IMAGE_TYPES.include?(type)
      raise StandardError.new('File is too lagre!') if decoded.bytesize > IMAGE_SIZE_LIMIT

      @user.avatar.purge
      @user.avatar.attach(
        io: StringIO.new(decoded),
        filename: SecureRandom.urlsafe_base64,
        content_type: type,
      )
    end
  end
end
