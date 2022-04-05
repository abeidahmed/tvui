require "test_helper"

class UserTest < ActiveSupport::TestCase
  context "validations" do
    should validate_presence_of(:first_name)
    should validate_presence_of(:password)
    should validate_length_of(:first_name).is_at_most(127)
    should validate_length_of(:last_name).is_at_most(127)
  end
end
