FactoryBot.define do
  factory :appointment do
    creator
    start_time { "2022-04-06 16:14:06" }
    end_time { nil }
    duration { 30 }
  end
end
