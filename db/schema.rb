# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120102063424) do

  create_table "accounts", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "category_id"
    t.string   "caption"
  end

  add_index "accounts", ["category_id"], :name => "index_accounts_on_category_id"

  create_table "categories", :force => true do |t|
    t.string   "caption"
    t.integer  "invert"
    t.integer  "element_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "categories", ["element_id"], :name => "index_categories_on_element_id"

  create_table "contacts", :force => true do |t|
    t.string   "caption"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "elements", :force => true do |t|
    t.string   "caption"
    t.integer  "invert"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transaction_methods", :force => true do |t|
    t.string   "caption"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transactions", :force => true do |t|
    t.text     "memo"
    t.string   "refnum"
    t.integer  "transaction_method_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "contact_id"
    t.date     "date"
  end

  add_index "transactions", ["contact_id"], :name => "index_transactions_on_contact_id"
  add_index "transactions", ["transaction_method_id"], :name => "index_transactions_on_transaction_method_id"

end
