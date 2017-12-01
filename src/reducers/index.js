"use strict"

import { combineReducers } from 'redux';

// Reducers to be combined
import { booksReducers } from './booksReducers';
import { cartReducers } from './cartReducers';

export default combineReducers({
  books: booksReducers,
  cart: cartReducers
})