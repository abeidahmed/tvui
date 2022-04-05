FactoryBot.define do
  factory :user do
    sequence(:first_name) { |n| "John #{n}" }
    sequence(:email) { |n| "john@example#{n}.com" }
    password { "secret_password" }
  end
end
