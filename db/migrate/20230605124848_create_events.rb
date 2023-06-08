class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :event_name
      t.string :description
      t.string :location
      t.string :location_url
      t.integer :entry_fee
      t.string :category
      t.integer :seats
      t.date :start_date
      t.time :start_time
      t.date :end_date
      t.time :end_time
      t.references :users, null: false, foreign_key: true

      t.timestamps
    end
  end
end
