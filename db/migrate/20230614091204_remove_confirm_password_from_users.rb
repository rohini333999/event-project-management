class RemoveConfirmPasswordFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :confirmPassword
  end
end
