// import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import { createStore, applyMiddleware, compose } from "redux"
import gamesReducer from '../Reducers/reducer.js'
// import buttonsReducer from "../reducers/buttonsReducer.js";
import thunk from "redux-thunk";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore((gamesReducer), composeEnhancer(applyMiddleware(thunk)))


// const store = createStore(combineReducers({ buttonsReducer, gamesReducer}),    
//     composeEnhancer(applyMiddleware(thunk)))

export default store