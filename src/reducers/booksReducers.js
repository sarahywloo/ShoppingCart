"use strict"

// Books Reducers
// defined reducers to evaluate what to do with the received actions
// initial state needs to be set so we can add to the payload
export function booksReducers(state={ 
  books:     
    [{
      _id: 1,
      title: "This is title 1",
      description: "This is description 1",
      price: 45.50
    },
    {
      _id: 2,
      title: "This is title 2",
      description: "This is description 2",
      price: 20.20
    }]  
}, action) {
    switch(action.type) {
      case "GET_BOOKS":
      return { ...state, books: [ ...action.payload ]}
      break;
      case "POST_BOOK":
      /* let books = state.books.concat(action.payload);
      return { books }; */
      return { books: [ ...state.books, ...action.payload ]}
      break;
      case "DELETE_BOOK":
      // Creating a copy of the current array of books
      const currentBookToDelete = [ ...state.books ];
      // Determine which index in books array is the book to be deleted
      const indexToDelete = currentBookToDelete.findIndex(
        function(book){
          return book._id.toString() === action.payload;
        }
      )
      // Remove the book at the specified index
      return { books: [ ...currentBookToDelete.slice(0, indexToDelete), 
        ...currentBookToDelete.slice(indexToDelete + 1)]}
      break;
      case "UPDATE_BOOK":
      // Creating a copy of the current array of books
      const currentBookToUpdate = [ ...state.books ];
      // Determine at which index in the books array is the book to be deleted
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book){
          return book._id === action.payload._id;
        }
      )
      // Create a new book object with the new values and with the 
      // same array index of the item that we want to replace.
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      }
      // Log how newBookToUpdate looks like
      console.log('What is newBookToUpdate', newBookToUpdate);
      // Slice to remove the book at the specified index, replace with the new object
      // Concatenate the rest of the items in the array
      return {
        books: [ ...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)]
      }
      break;
    }
    return state;
}