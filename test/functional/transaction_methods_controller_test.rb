require 'test_helper'

class TransactionMethodsControllerTest < ActionController::TestCase
  setup do
    @transaction_method = transaction_methods(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:transaction_methods)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create transaction_method" do
    assert_difference('TransactionMethod.count') do
      post :create, transaction_method: @transaction_method.attributes
    end

    assert_redirected_to transaction_method_path(assigns(:transaction_method))
  end

  test "should show transaction_method" do
    get :show, id: @transaction_method.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @transaction_method.to_param
    assert_response :success
  end

  test "should update transaction_method" do
    put :update, id: @transaction_method.to_param, transaction_method: @transaction_method.attributes
    assert_redirected_to transaction_method_path(assigns(:transaction_method))
  end

  test "should destroy transaction_method" do
    assert_difference('TransactionMethod.count', -1) do
      delete :destroy, id: @transaction_method.to_param
    end

    assert_redirected_to transaction_methods_path
  end
end
