module Api
  module V1
    class ApplicationController < ::ApplicationController
      include ActionController::MimeResponds

      private

      def authenticate_user!
        head :unauthorized unless signed_in?
      end

      def jsonapi_params(only:)
        ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: only)
      end
    end
  end
end
