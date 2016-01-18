'use strict';
import React from 'react';
import Page from './Page';
import qs from 'querystring';
import request from 'superagent';

var oneLine = '一二三四，五六七八九一二，三四五六'.repeat(4);
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
                            glances: []
                        }
                    ]
                }
            ]
        }
        或
        text = [page, page]
        page = [line, line]
        line = [glance, glance]
*/
export default class ReadRealPractise extends React.Component {
    static defaultProps = {
        width: '50em',
        pageLineNum: 13,
        lineFontNum: 39,
        glanceFontNum: 13,
        delay: 333,
        textSrc: null,
        text: text
    };

    interval = null;
    _text = '';

    state = {
        pageIndex: 0,
        lineIndex: 0,
        glanceIndex: -1,
    };

    constructor(props) {
        super(props);
        this.pages = [];
        this.lines = [];
        var {textSrc} = this.getProps();

        if (textSrc) {
            this.getText();
        } else {
            this.formatText(this.props.text);
        }
    }

    getText() {
        var self = this;
        var {textSrc} = this.getProps();
        console.log('get text from', textSrc);
        request
            .get(textSrc)
            .end(function(err, res) {
                if (err) {
                    console.log('request error', textSrc, err);
                    return;
                }
                console.log('get text', res.text);
                self._text = res.text;
                self.formatText(res.text);
                self.forceUpdate();
            });
    }

    getProps() {
        var query = qs.parse(location.hash.split('?')[1] || '');
        return Object.assign({}, this.props, query);
    }

    formatText(text) {
        this.lines = this.getLines(text);
        var glanceLines = this.getGlanceLines(this.lines);
        this.pages = this.getPages(glanceLines);
        console.log('pages', this.pages);
    }

    splitArray(arr, maxNum) {
        var ret = [];
        while (arr.length > maxNum) {
            ret.push(arr.slice(0, maxNum));
            arr = arr.slice(maxNum);
        }
        if (arr.length > 0) {
            ret.push(arr);
        }

        return ret;
    }

    getLines(text) {
        var {lineFontNum} = this.getProps();
        var lines = [];
        var originLines = text.split('\n');
        originLines.forEach((line) => {
            let fixNumLine = this.splitArray(line, lineFontNum);
            lines.push(...fixNumLine);
        });
        return lines;
    }

    getGlanceLines(lines) {
        var {glanceFontNum} = this.getProps();
        var glanceLines = [];
        lines.forEach((line) => {
            var gline = this.splitArray(line, glanceFontNum);
            glanceLines.push(gline);
        });

        return glanceLines;
    }

    getPages(glanceLines) {
        var {pageLineNum} = this.getProps();
        var pages = this.splitArray(glanceLines, pageLineNum);
        return pages;
    }

    componentWillUnmount() {
        this.stopTick();
    }

    startTick() {
        if (this.interval) return;
        var {delay} = this.getProps();
        this.interval = setInterval(() => {
            this.tick();
        }, delay);
    }

    stopTick() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    tick() {
        console.log("tick");
        var {pageIndex, lineIndex, glanceIndex} = this.state;
        var pageTotal = this.pages.length;
        var curPage = this.pages[pageIndex];
        var lineTotal = curPage.length;
        var line = curPage[lineIndex];
        var glanceTotal = line.length;

        var maxNums = [pageTotal, lineTotal, glanceTotal];
        var curStates = [pageIndex, lineIndex, glanceIndex];
        for (let i = curStates.length - 1; i >= 0; i--) {
            if (curStates[i] < maxNums[i] - 1) {
                curStates[i]++;
                break;
            }
            curStates[i] = 0;
        }
        var state = {};
        [state.pageIndex, state.lineIndex, state.glanceIndex] = curStates;
        console.log('state', this.state);
        this.setState(state);
    }

    onClick(e) {
        console.log('on click', e);
        if (this.interval) {
            this.stopTick();
        } else {
            this.startTick();
        }
    }

    render() {
        var {width} = this.getProps();
        var {pageIndex, ...other} = this.state;
        var lines = this.pages[pageIndex] || [];
        return (
            <div className="read-page-container" onClick={this.onClick.bind(this)}>
                <Page {...other} lines={lines}/>
            </div>
        );
    }
}

