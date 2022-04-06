class Appointment < ApplicationRecord
  belongs_to :creator, class_name: "User"

  validates :start_time, presence: true
  validates :duration, presence: true
end
