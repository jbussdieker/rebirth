class TransactionMethodsController < ApplicationController
  # GET /transaction_methods
  # GET /transaction_methods.json
  def index
    @transaction_methods = TransactionMethod.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @transaction_methods }
    end
  end

  # GET /transaction_methods/1
  # GET /transaction_methods/1.json
  def show
    @transaction_method = TransactionMethod.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @transaction_method }
    end
  end

  # GET /transaction_methods/new
  # GET /transaction_methods/new.json
  def new
    @transaction_method = TransactionMethod.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @transaction_method }
    end
  end

  # GET /transaction_methods/1/edit
  def edit
    @transaction_method = TransactionMethod.find(params[:id])
  end

  # POST /transaction_methods
  # POST /transaction_methods.json
  def create
    @transaction_method = TransactionMethod.new(params[:transaction_method])

    respond_to do |format|
      if @transaction_method.save
        format.html { redirect_to @transaction_method, notice: 'Transaction method was successfully created.' }
        format.json { render json: @transaction_method, status: :created, location: @transaction_method }
      else
        format.html { render action: "new" }
        format.json { render json: @transaction_method.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /transaction_methods/1
  # PUT /transaction_methods/1.json
  def update
    @transaction_method = TransactionMethod.find(params[:id])

    respond_to do |format|
      if @transaction_method.update_attributes(params[:transaction_method])
        format.html { redirect_to @transaction_method, notice: 'Transaction method was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @transaction_method.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /transaction_methods/1
  # DELETE /transaction_methods/1.json
  def destroy
    @transaction_method = TransactionMethod.find(params[:id])
    @transaction_method.destroy

    respond_to do |format|
      format.html { redirect_to transaction_methods_url }
      format.json { head :ok }
    end
  end
end
