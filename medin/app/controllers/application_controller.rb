class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :masquerade_user!
  before_action :authenticate_user!

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
  end

  def render_json_errors(errors, status: :unprocessable_entity)
    render json: ErrorSerializer.serialize(errors), status: status
  end
end
