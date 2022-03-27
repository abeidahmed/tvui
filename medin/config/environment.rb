# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
Medin::Application.default_url_options = Medin::Application.config.action_mailer.default_url_options
