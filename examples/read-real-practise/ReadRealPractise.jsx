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
        lineFontNum: 40,
        glanceFontNum: 13,
        text: text
    };

    getLines() {
        var {text, lineFontNum} = this.props;
        var lines = [];
        var originLines = text.split('\n');
        originLines.forEach(function(line) {
            while(line.length > lineFontNum) {
                lines.push(line.slice(0, lineFontNum));
                line = line.slice(lineFontNum);
            }
            if (line.length > 0) {
                lines.push(line);
            }
        });

        return lines;
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

