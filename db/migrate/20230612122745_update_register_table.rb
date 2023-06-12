class UpdateRegisterTable < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :registers, column: :events_id
    remove_foreign_key :registers, column: :users_id
  
    add_foreign_key :registers, :events, column: :events_id, on_delete: :cascade
    add_foreign_key :registers, :users, column: :users_id, on_delete: :cascade
  end
end
