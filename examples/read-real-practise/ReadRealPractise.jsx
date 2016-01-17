'use strict';
import React from 'react';

var oneLine = '一二三四五六七八九一二三四五六'.repeat(4);
var text = [];
for (let i = 0; i < 300; i++) {
    text.push(oneLine);
}
text = text.join('\n');
/*
    一段文字分为n页，一页分为n行，一行分为n眼跳，每次眼跳颜色随之变动，
    如果当页结束，则开始下一页

    数据设计:
        text = {
            index: 0,
            pages: [
                {
                    index: 0,
                    lines: [
                        {
                            index: 0,
                            glaces: []
                        }
                    ]
                }
            ]
        }
        或
        text = [page, page]
        page = [line, line]
        line = [glace, glace]
*/
export default class ReadRealPractise extends React.Component {
    static defaultProps = {
        pageLineNum: 12,
        lineFontNum: 40,
        glanceFontNum: 13,
        text: text
    };

    state = {
        pageIndex: 0,
        lineIndex: 0,
        glaceIndex: 0,
    };

    constructor(props) {
        super(props);
        this.pages = [];
        this.lines = [];
        this.formatText();
    }

    formatText() {
        this.lines = this.getLines();
        var glaceLines = this.getGlaceLines(this.lines);
        this.pages = this.getPages(glaceLines);
    }

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

    getGlaceLines(lines) {
        var {glanceFontNum} = this.props;
        var glaceLines = [];
        lines.forEach(function(line) {
            var gline = [];
            while (line.length > glanceFontNum) {
                gline.push(line.slice(0, glanceFontNum));
                line = line.slice(glanceFontNum);
            }
            if (line.length > 0) {
                gline.push(line);
            }
            glaceLines.push(gline);
        });

        return glaceLines;
    }

    getPages(glaceLines) {
        var {pageLineNum} = this.props;
        var pages = [];
        while (glaceLines.length > pageLineNum) {
            pages.push(glaceLines.slice(0, pageLineNum));
            glaceLines = glaceLines.slice(pageLineNum);
        }
        return pages;
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

