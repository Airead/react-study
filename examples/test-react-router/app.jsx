'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory,} from 'react-router';

class One extends React.Component {
    static defaultProps = {
        content: 'one'
    };
    render() {
        return (
            <div>
                {this.props.content}
            </div>
        );
    }
}

class Two extends React.Component {
    static defaultProps = {
        content: 'two'
    };
    render() {
        var content = this.props.content;
        if (this.props.route.content) {
            content = this.props.route.content;
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <a href="#one">one</a>
                </div>
                <div>
                    <a href="#two">two</a>
                </div>
                <div>
                    <a href="#three">three</a>
                </div>
                <Router history={hashHistory}>
                    <Route path="one" component={One}/>
                    <Route path="two" component={Two}/>
                    <Route path="three" component={Two} content="three"/>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('container'));
