class Account < ActiveRecord::Base
  belongs_to :category
  has_many :journals
end
