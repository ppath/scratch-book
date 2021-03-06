import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import { Promise } from 'bluebird';
import App from './components/App';

// Enable bluebird promise cancellation.
Promise.config({ cancellation: true });

ReactDOM.render(
    <>
        <App/>
    </>,
    document.getElementById('root')
);
