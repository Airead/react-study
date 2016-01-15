'use strict';

var React = require('react');
var ReactDom = require('react-dom');

var BootstrapButton = React.createClass({
	render: function() {
		return (
			<a
				{...this.props}
				href="#"
				className={(this.props.className || '') + ' btn'}
			/>
		);
	}
});

var BootstrapModal = React.createClass({
	componentDidMount: function() {
    	$(this.refs.root).modal({backdrop: 'static', keyboard: false, show: false});
	},
	componentWillUnmount: function () {
		$(this.refs.root).off('hidden', this.handleHidden);
	},
	close: function() {
		$(this.refs.root).modal('hide');
	},
	open: function() {
		$(this.refs.root).modal('show');
	},
	handleCancel: function() {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	},
	handleConfirm: function() {
		if (this.props.onConfirm) {
			this.props.onConfirm();
		}
	},
	render: function () {
		var confirmButton = null;
		var cancelButton = null;

		if (this.props.confirm) {
			confirmButton = (
				<BootstrapButton
				onClick={this.handleConfirm}
				className="btn-primary">
				{this.props.confirm}
				</BootstrapButton>
			);
		}
		if (this.props.cancel) {
			cancelButton = (
				<BootstrapButton onClick={this.handleCancel} className="btn-default">
					{this.props.cancel}
				</BootstrapButton>
			);
		}

		return (
			<div className="modal fade" ref="root">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.handleCancel}>&times;</button>
							<h3>{this.props.title}</h3>
						</div>
						<div className="modal-body">{this.props.children}</div>
						<div className="modal-footer">
							{cancelButton}
							{confirmButton}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var Example = React.createClass({
	openModal: function() {
		console.log('open modal');
		this.refs.modal.open();
	},
	closeModal: function() {
		console.log('close modal');
		this.refs.modal.close();
	},
	render: function() {
		var modal = null;
		modal = (
			<BootstrapModal
				ref="modal"
				confirm="OK"
				cancel="Cancel"
				onCancel={this.closeModal}
				onConfirm={this.closeModal}
				title="Hello, Bootstrap!">
				This is a React component powered by jQuery and Bootstrap!
			</BootstrapModal>
		);
		return (
			<div className="example">
				{modal}
				<BootstrapButton onClick={this.openModal} className="btn-default">
					Open modal
				</BootstrapButton>
			</div>
		);
	}
});

ReactDom.render(
	<Example />,
	document.getElementById('jqueryexample')
);