require "test_helper"

class AppointmentTest < ActiveSupport::TestCase
  context "associations" do
    should belong_to(:creator).class_name("User")
  end

  context "validations" do
    should validate_presence_of(:start_time)
    should validate_presence_of(:duration)
  end
end
