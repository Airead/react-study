import React from 'react';

export default class Page extends React.Component {
	getLine(line, index) {
		var glances = line.map((glance, i) => {
			return (
				<span key={i}>{glance}</span>
			);
		});
		return (
			<p key={index}>{glances}</p>
		);
	}

	render() {
		var {lines} = this.props;
		var children = lines.map((line, i) => {
			return this.getLine(line, i);
		});
		return (
			<div>
				{children}
			</div>
		);
	}
}
