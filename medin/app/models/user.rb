class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :masqueradable

  has_person_name

  validates :first_name, presence: true, length: {maximum: 127}
  validates :last_name, length: {maximum: 127}

  has_many :appointments, foreign_key: :creator_id, dependent: :destroy
end
