// @ts-nocheck
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

var rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(createElement(App));
}
