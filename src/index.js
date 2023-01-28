import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Application from './components/App/App';

// const el = React.createElement(('h1', null, 'Hello Word'))
// root.render(el)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Application />);

