import {createStore, combineReducers} from 'redux';
import playerBar from './reducers/index';

export default function configureStore(initialStore) {
    const reducers = {
        playerBar
    };

    const rootReducer = combineReducers(reducers);

    return createStore(rootReducer, initialStore);
}
