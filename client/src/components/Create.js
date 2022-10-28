import React, { Component } from 'react'

class Create extends Component {
	constructor() {
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			errors: [],
			productSku: '',
			productName: '',
			productPrice: '',
			productDesc: '',
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleInsertProduct = this.handleInsertProduct.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	//--- Insert new user in users state array by props method ---//
	handleInsertProduct(e) {
		e.preventDefault()
		const data = {
			productSku: this.state.productSku,
			productName: this.state.productName,
			productPrice: this.state.productPrice,
			productDesc: this.state.productDesc,
		}
		if (!this.checkValidation(data)) {
			this.reset();
			this.props.updateState(data, 0);
			document.getElementById("closeAddModal").click();
		}
	}
	//--- Validate all input field ---//
	checkValidation(fields) {
		var error = {};
		if (fields.productSku.length === 0) {
			error.productSku = ['This field is required!'];
		}
		if (fields.productName.length === 0) {
			error.productName = ['This field is required!'];
		}
		if (fields.productPrice.length === 0) {
			error.productPrice = ['This field is required!'];
		}
		if (fields.productDesc.length === 0) {
			error.productDesc = ['This field is required!'];
		}
		this.setState({
			errors: error
		})
		if (fields.productSku.length === 0 || fields.productName.length === 0 || fields.productPrice.length === 0 || fields.productDesc.length === 0) {
			return true;
		} else {
			return false;
		}
	}
	//--- Reset all state variable while insert new user ---//
	reset() {
		this.setState(this.baseState);
	}
	//--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName) {
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName) {
		if (this.hasErrorFor(fieldName)) {
			return (
				<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
			)
		}
	}

	render() {
		return (
			<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">New Product</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<form onSubmit={this.handleInsertProduct}>
							<div className="modal-body">
								<div className="form-group">
									<label htmlFor="productSku" className="col-form-label">Product SKU:</label>
									<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('productSku') ? 'is-invalid' : ''}`}
										id="productSku" name="productSku" placeholder="User name" onChange={this.handleInputFieldChange} value={this.state.productSku} />
									{this.renderErrorFor('productSku')}
								</div>
								<div className="form-group">
									<label htmlFor="productName" className="col-form-label">Product SKU:</label>
									<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('productName') ? 'is-invalid' : ''}`}
										id="productName" name="productName" placeholder="User name" onChange={this.handleInputFieldChange} value={this.state.productName} />
									{this.renderErrorFor('productName')}
								</div>
								<div className="form-group">
									<label htmlFor="productPrice" className="col-form-label">Product SKU:</label>
									<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('productPrice') ? 'is-invalid' : ''}`}
										id="productPrice" name="productPrice" placeholder="User name" onChange={this.handleInputFieldChange} value={this.state.productPrice} />
									{this.renderErrorFor('productPrice')}
								</div>
								<div className="form-group">
									<label htmlFor="productDesc" className="col-form-label">Product SKU:</label>
									<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('productDesc') ? 'is-invalid' : ''}`}
										id="productDesc" name="productDesc" placeholder="User name" onChange={this.handleInputFieldChange} value={this.state.productDesc} />
									{this.renderErrorFor('productDesc')}
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" id="closeAddModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
								<button type="submit" className="btn btn-primary btn-sm">Save Product</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
export default Create