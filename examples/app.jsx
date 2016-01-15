var React = require('react');
var ReactDOM = require('react-dom');

var examples = [
	'basic',
	'jquery-bootstrap',
	'quadratic',
	'transitions',
];

var Examples = React.createClass({
	render: function() {
		console.log('this.props', this.props.examples);
		return (
			<div className="row small-up-2 medium-up-3 large-up-5">
			{this.props.examples.map(function(example) {
				return <div key={example} className="column"><a href={example}>{example}</a></div>
			})}
			</div>
		);
	}
});

ReactDOM.render(
	<Examples examples={examples}></Examples>,
	document.getElementById('container')
);