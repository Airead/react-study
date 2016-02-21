'use strict';
import React from 'react';

var activeClass = 'read-glance-active';
var noActiveClass = 'read-glance-no-active';

export default class Page extends React.Component {
	static propTypes: {
		lines: React.PropTypes.array.isRequired,
		lineIndex: React.PropTypes.number.isRequired,
		glanceIndex: React.PropTypes.number.isRequired,
	};

	getLine(line, index) {
		var {lineIndex, glanceIndex} = this.props;
		var glances = line.map((glance, i) => {
			var className = '';
			if (lineIndex === index && glanceIndex === i) {
				className += activeClass;
			} else {
                className += noActiveClass;
            }
			return (
				<span key={i} className={className}>{glance}</span>
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
