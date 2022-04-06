require "test_helper"

class Api::V1::AppointmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create(:user)
    sign_in(@user)
  end

  def test_create_successfully
    assert_difference "Appointment.count" do
      post api_v1_appointments_path, params: {data: {attributes: {start_time: Time.current, duration: 30}}}
    end

    appointment = Appointment.last
    assert appointment.start_time
    assert_equal 30, appointment.duration
    assert_equal @user, appointment.creator
    assert_response :created
  end

  def test_create_with_errors
    assert_no_difference "Appointment.count" do
      post api_v1_appointments_path, params: {data: {attributes: {start_time: nil, duration: 30}}}
    end
    assert_equal %i[start_time], error_types
    assert_response :unprocessable_entity
  end
end
