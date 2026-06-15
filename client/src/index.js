import React from 'react';
import App from './App';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import BascketStore from './store/BascketStore';
import { createRoot } from 'react-dom/client';
import './css/index.css';

export const Context = React.createContext({
  user: new UserStore(),
  product: new ProductStore(),
  bascket: new BascketStore()
});

const container = document.getElementById('root');
const root = createRoot(container);

// Убираем BrowserRouter, так как он уже в App.js
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    product: new ProductStore(),
    bascket: new BascketStore()
  }}>
    <App />
  </Context.Provider>
);

//export const Context = createContext(null)

/*ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(), 
    product: new ProductStore(),
    bascket: new BascketStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
)*/

