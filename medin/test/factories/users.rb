FactoryBot.define do
  factory :user, aliases: %i[creator] do
    sequence(:first_name) { |n| "John #{n}" }
    sequence(:email) { |n| "john@example#{n}.com" }
    password { "secret_password" }
  end
end
