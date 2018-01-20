import React from 'react';
import ReactDOM from 'react-dom';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

class App extends React.Component {
    render() {
        return <h1>asdfasdf</h1>;
    }
}

ReactDOM.render(
    <App />,
    rootElement
);
