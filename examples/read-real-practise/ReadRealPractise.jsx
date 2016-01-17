'use strict';
import React from 'react';

var oneLine = '一二三四五六七八九一二三四五六'.repeat(4);
var text = [];
for (let i = 0; i < 300; i++) {
	text.push(oneLine);
}
text = text.join('\n');

export default class ReadRealPractise extends React.Component {
	static defaultProps = {
		text: text
	};

	getLines() {
		return this.props.text.split('\n');
	}

	render() {
		var lines = this.getLines();
		var count = 0;
		var children = lines.map(line => {
			count++;
			console.log('count', count);
			return <p key={count}>{line}</p>;
		});
		return (
			<div>
				{children}
			</div>
		);
	}
}

