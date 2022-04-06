class CreateAppointments < ActiveRecord::Migration[7.0]
  def change
    create_table :appointments do |t|
      t.datetime :start_time, null: false
      t.datetime :end_time
      t.integer :duration, null: false
      t.integer :creator_id, null: false

      t.timestamps
    end

    add_index :appointments, :creator_id
  end
end
