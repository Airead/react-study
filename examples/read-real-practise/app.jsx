import React from 'react';
import ReactDOM from 'react-dom';
import ReadRealPractise from './ReadRealPractise';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello World</h1>
				<ReadRealPractise />
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('container')
);