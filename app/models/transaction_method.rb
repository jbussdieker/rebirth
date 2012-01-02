class TransactionMethod < ActiveRecord::Base
  has_many :transactions
end
