module Users
  class UpdateService < ApplicationService
    IMAGE_SIZE_LIMIT_MB = 2
    IMAGE_TYPES = [
      'image/jpeg',
      'image/png'
    ].freeze

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

      raise UnprocessableImageError if !image || !type
      raise UnsupportedTypeError unless IMAGE_TYPES.include?(type)
      raise ImageSizeExcidedError if decoded.bytesize > IMAGE_SIZE_LIMIT_MB.megabytes

      @user.avatar.purge
      @user.avatar.attach(
        io: StringIO.new(decoded),
        filename: SecureRandom.urlsafe_base64,
        content_type: type
      )
    end
  end

  class AvatarUpdateError < StandardError
  end

  class UnprocessableImageError < AvatarUpdateError
    def message
      'Unprocessable image.'
    end
  end

  class UnsupportedTypeError < AvatarUpdateError
    def message
      'Unsupported image format.'
    end
  end

  class ImageSizeExcidedError < AvatarUpdateError
    def message
      "Image should be smaller than #{UpdateService::IMAGE_SIZE_LIMIT_MB} MB!"
    end
  end
end
