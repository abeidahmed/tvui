module Api
  module V1
    class AppointmentSerializer < ApplicationSerializer
      belongs_to :creator

      attributes :id, :start_time, :end_time, :duration
    end
  end
end
