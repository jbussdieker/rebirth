class Transaction < ActiveRecord::Base
  belongs_to :transaction_method
  belongs_to :contact
end
