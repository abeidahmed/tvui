module Api
  module V1
    class AppointmentsController < ApplicationController
      def create
        appointment = current_user.appointments.build(appointment_params)

        if appointment.save
          render json: appointment, status: :created
        else
          render_json_errors(appointment.errors)
        end
      end

      private

      def appointment_params
        jsonapi_params(only: %i[start_time duration])
      end
    end
  end
end
