require "test_helper"

Capybara.configure do |config|
  config.always_include_port = true
  config.app_host = "http://lvh.me"
  config.default_max_wait_time = 5
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  include Devise::Test::IntegrationHelpers

  driven_by :selenium, using: :headless_chrome do |option|
    option.add_argument "no-sandbox"
  end

  def after_teardown
    super
    FileUtils.rm_rf(ActiveStorage::Blob.service.root)
  end
end
