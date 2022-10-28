import React, { Component } from 'react'

class Edit extends Component {
	constructor() {
		super();
		//--- Declare method for this component ---//
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
		this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Receive props while update modal open ---//
	UNSAFE_componentWillReceiveProps(productData) {
		this.setState({
			productSku: productData.productSku,
			productName: productData.productName,
			productPrice: productData.productPrice,
			productDesc: productData.productDesc
		})
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	//--- Update state users variable by props method ---//
	handleUpdateProduct(e) {
		e.preventDefault()
		//--- Declare state variable for this component ---//
		const data = {
			productSku: this.state.productSku,
			productName: this.state.productName,
			productPrice: this.state.productPrice,
			productDesc: this.state.productDesc,
		}
		if (!this.checkValidation(data)) {
			this.reset();
			this.props.updateState(data, 1);
			document.getElementById("closeEditModal").click();
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
	//--- Reset all state variable while update product ---//
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
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Update user information</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<form onSubmit={this.handleUpdateProduct}>
							<div className="modal-body">
								<div className="form-group">
									<label htmlFor="username" className="col-form-label">User name:</label>
									<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
										id="username" name="username" placeholder="User name" onChange={this.handleInputFieldChange} value={this.state.username} />
									{this.renderErrorFor('username')}
								</div>
								<div className="form-group">
									<label htmlFor="mobile_no" className="col-form-label">Mobile No:</label>
									<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('mobile_no') ? 'is-invalid' : ''}`}
										id="mobile_no" name="mobile_no" placeholder="Mobile no" onChange={this.handleInputFieldChange} value={this.state.mobile_no} />
									{this.renderErrorFor('mobile_no')}
								</div>
								<div className="form-group">
									<label htmlFor="email" className="col-form-label">Email:</label>
									<input type="email" className={`form-control form-control-sm ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
										id="email" name="email" placeholder="Email" onChange={this.handleInputFieldChange} value={this.state.email} />
									{this.renderErrorFor('email')}
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
								<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
export default Edit