module Api
  module V1
    class UserSerializer < ApplicationSerializer
      attributes :id, :name, :email, :created_at, :updated_at
    end
  end
end
