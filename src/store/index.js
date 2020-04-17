import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';

// const EVENT_TEXT = 'Getting event stored in database to display on calendar';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// eslint-disable-next-line max-len
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware()));

export default store;
