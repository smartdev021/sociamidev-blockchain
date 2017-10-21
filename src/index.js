import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';

import {Provider} from "react-redux"
import store from "./redux/store"

console.log("store: ")
console.dir(store);
console.log("store state: ")
console.dir(store.getState());

ReactDOM.render((
    <Provider store={store}>
    <BrowserRouter>
         <App RouteProps/>
    </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
);
