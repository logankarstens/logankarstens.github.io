import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { PageContextProvider } from './Store/page-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PageContextProvider><App /></PageContextProvider>);
