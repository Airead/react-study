import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';
import hotkey from 'react-hotkey';

hotkey.activate('keyup');

class App extends React.Component {
	onClick(e) {
		console.log('click ', e);
	}
	onKeyUp(e) {
		console.log('keyup', e.keyCode, String.fromCharCode(e.keyCode));
	}
	render () {
		return (
			<div
				onClick={this.onClick}
				onKeyUp={this.onKeyUp}
			>
				<h1>Test Events</h1>
			</div>
		);
	}
}
reactMixin(App.prototype, hotkey.Mixin('onKeyUp'));

ReactDOM.render(
	<App />,
	document.getElementById('container')
);