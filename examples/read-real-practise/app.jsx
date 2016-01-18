import React from 'react';
import ReactDOM from 'react-dom';
import ReadRealPractise from './ReadRealPractise';

class App extends React.Component {
    render() {
        return (
            <div className="row column text-center">
                <ReadRealPractise />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);