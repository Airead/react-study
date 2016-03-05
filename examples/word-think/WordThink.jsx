'use strict';
import React from 'react';
import request from 'superagent';

export default class WordThink extends React.Component {

    state = {
        curWord: ''
    };

    constructor(props) {
        super(props);
        this.words = [];
        this.getWords('words.txt');
    }

    getWords(url) {
        var self = this;
        request
            .get(url)
            .end(function(err, res) {
                if (err) {
                    console.log('request error', url);
                    return;
                }
                self.words = res.text.split(' ');
            });
    }

    onClick() {
        var index = parseInt(Math.random() * this.words.length);
        var curWord = this.words[index];
        this.setState({curWord: curWord});
    }

    render() {
        var style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        var fontStyle = {
            color: '#DADADA',
            fontSize: '100px',
        };
        return (
            <div style={style} onClick={this.onClick.bind(this)}>
                <div style={fontStyle}>{this.state.curWord}</div>
            </div>
        );
    }
}
