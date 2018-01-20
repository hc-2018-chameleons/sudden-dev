import {createStore, combineReducers} from 'redux';
import addPlayer from './reducers/index';

export default function configureStore(initialStore) {
    const reducers = {
        addPlayer
    };

    const rootReducer = combineReducers(reducers);

    return createStore(rootReducer, initialStore);
}
