'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import WordThink from './WordThink'

class App extends React.Component {
    render() {
        return (
            <div>
                <WordThink />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
