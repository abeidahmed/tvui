module Api
  module V1
    class ApplicationController < ::ApplicationController
      include ActionController::MimeResponds

      private

      def jsonapi_params(only:)
        ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: only)
      end
    end
  end
end
