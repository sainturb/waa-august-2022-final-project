import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {x_store} from "./redux/x_store";

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use(function (config) {
    if (localStorage.getItem('access_token')) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

root.render(
    <Provider store={x_store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
