import React from 'react';
import ReactDOM from 'react-dom/client';

import {JournalApp} from './JournalApp.jsx';

import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <JournalApp/>
    </React.StrictMode>,
)
