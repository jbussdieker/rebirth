class Category < ActiveRecord::Base
  has_many :accounts
  belongs_to :element
end
