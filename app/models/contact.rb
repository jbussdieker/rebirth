class Contact < ActiveRecord::Base
  has_many :transactions
end
