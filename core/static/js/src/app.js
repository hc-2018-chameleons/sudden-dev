import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import VisiblePlayerList from './components/playerlist'
import AddPlayerButton from './components/addplayer'

import configureStore from './store';

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

var initialStore = {
    'playerBar': []
}

const store = configureStore(initialStore);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <VisiblePlayerList />
            <AddPlayerButton />
        </div>
    </Provider>,
    rootElement
);
