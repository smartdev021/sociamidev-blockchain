import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'
import App from './App';

ReactDOM.render((
    <BrowserRouter>
         <App RouteProps/>
    </BrowserRouter>
    ),
    document.getElementById('root')
);
