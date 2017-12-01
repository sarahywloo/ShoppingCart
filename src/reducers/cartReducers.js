"use strict"

// Books Reducers
// defined reducers to evaluate what to do with the received actions
// initial state needs to be set so we can add to the payload
export function cartReducers(state={cart:[]}, action) {
  switch(action.type){
    case "ADD_TO_CART":
    return {cart:[ ...state.cart, ...action.payload ]}
    break;
  }
  return state;
}