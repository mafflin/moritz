class User < ApplicationRecord
  has_secure_password

  has_many :groups, dependent: :destroy
  has_many :imports, dependent: :destroy
  has_many :payments, dependent: :destroy
  has_many :rules, dependent: :destroy
  has_many :sessions, dependent: :destroy

  has_one :setting, dependent: :destroy

  has_one_attached :avatar, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  # validates :email, presence: true, uniqueness: true

  # validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
end
