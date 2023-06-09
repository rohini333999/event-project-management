# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_14_091204) do
  create_table "events", force: :cascade do |t|
    t.string "event_name"
    t.string "description"
    t.string "location"
    t.string "location_url"
    t.integer "entry_fee"
    t.string "category"
    t.integer "seats"
    t.date "start_date"
    t.time "start_time"
    t.date "end_date"
    t.time "end_time"
    t.integer "users_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["users_id"], name: "index_events_on_users_id"
  end

  create_table "registers", force: :cascade do |t|
    t.integer "users_id", null: false
    t.integer "events_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["events_id"], name: "index_registers_on_events_id"
    t.index ["users_id"], name: "index_registers_on_users_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "fullname"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "user"
  end

  add_foreign_key "events", "users", column: "users_id"
  add_foreign_key "registers", "events", column: "events_id", on_delete: :cascade
  add_foreign_key "registers", "users", column: "users_id", on_delete: :cascade
end
