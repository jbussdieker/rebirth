class Journal < ActiveRecord::Base
  belongs_to :transaction
  belongs_to :account
end
