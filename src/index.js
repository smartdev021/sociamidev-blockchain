import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';

import {Provider} from "react-redux"
import store from "./redux/store"
import { CookiesProvider } from 'react-cookie';

console.log("store: ")
console.dir(store);

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <App RouteProps/>
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
);
