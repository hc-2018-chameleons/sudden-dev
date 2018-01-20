import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));
var initialStore = {}

const store = configureStore(initialStore);

ReactDOM.render(
    <h1>Helloooooo asdf as da sdf as dfas</h1>,
    rootElement
);
