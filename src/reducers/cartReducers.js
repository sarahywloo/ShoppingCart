"use strict"

// Books Reducers
// defined reducers to evaluate what to do with the received actions
// initial state needs to be set so we can add to the payload
export function cartReducers(state={cart:[]}, action) {
  switch(action.type){
    case "ADD_TO_CART":
    return {
      ...state,
      cart: action.payload,
      totalAmount: cartTotal(action.payload).amount,
      totalQuantity: cartTotal(action.payload).quantity,
    }
    break;
    case "UPDATE_CART":
    const currentBookToUpdate = [ ...state.cart ];
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book){
        return book._id === action._id;
      }
    );
    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
    };
    
    let cartUpdate = [ ...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)];

    return {
      ...state,
      cart: cartUpdate,
      totalAmount: cartTotal(cartUpdate).amount,
      totalQuantity: cartTotal(cartUpdate).quantity,
    }
    break;
    case "DELETE_CART_ITEM":
    return {
      ...state,
      cart: action.payload,
      totalAmount: cartTotal(action.payload).amount,
      totalQuantity: cartTotal(action.payload).quantity,
    }
    break;
  }
  return state;
}

// Calculate cart total
export function cartTotal(payloadArr){
  const totalAmount = payloadArr.map(function(cartArr){
    return cartArr.price * cartArr.quantity;
  }).reduce(function(a, b){
    return a + b;
  }, 0); // sum from index 0

  const totalQuantity = payloadArr.map(function(qty){
    return qty.quantity;
  }).reduce(function(a, b){
    return a + b;
  }, 0);
  return {
    amount:totalAmount.toFixed(2),
    quantity:totalQuantity,
  }
}