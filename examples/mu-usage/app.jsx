'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';
import MyList from './ListExampleSimple.jsx';

const MyAwesomeReactComponent = () => (
	<div className="row column medium-6">
		<RaisedButton linkButton={true} href="http://www.baidu.com" label="Default"/>
		{MyList()}
	</div>
);

ReactDOM.render(
	<MyAwesomeReactComponent />,
	document.getElementById('container')
);

