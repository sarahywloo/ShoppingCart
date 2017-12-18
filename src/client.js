"use strict"
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// React Router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Import combined reducers here
import reducers from './reducers/index';

// Import actions
import { addToCart } from './actions/cartActions';
import * as bookActions from './actions/bookActions';


// creating the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList}/>
        <Route path="/admin" component={BooksForm} />
        <Route path="/cart" component={Cart} />
      </Route>
    </Router> 
  </Provider>
)

render(
  Routes, document.getElementById('app')
);

// dispatching actions for counter
/* store.dispatch(bookActions.postBook(
    [{
      id: 1,
      title: "This is title 1",
      description: "This is description 1",
      price: 45.50
    },
    {
      id: 2,
      title: "This is title 2",
      description: "This is description 2",
      price: 19.20
    }] 
  )
); */

/* // DELETE a book
store.dispatch(bookActions.deleteBook(
  {id: 1}
  )
);
// UPDATE a book
store.dispatch(bookActions.updateBook({
    id: 2,
    title: 'Edited title 2',
  })
);

// CART ACTIONS
// ADD to cart
store.dispatch(addToCart([{ id: 1 }])); */