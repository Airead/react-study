'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';

const MyAwesomeReactComponent = () => (
	<RaisedButton label="Default" />
);

ReactDOM.render(
	<MyAwesomeReactComponent />,
	document.getElementById('container')
);

