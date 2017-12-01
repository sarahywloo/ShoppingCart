"use strict"

// GET BOOKS
// Just gets the books from the database, no need for payload
export function getBooks() {
  return {
    type: "GET_BOOKS",
  }
}
// POST
export function postBook(book) {
  return {
    type: "POST_BOOK",
    payload: book
  }
}
// DELETE
export function deleteBook(id) {
  return {
    type: "DELETE_BOOK", 
    payload: id
  }
}
// UPDATE
export function updateBook(book) {
  return {
    type: "UPDATE_BOOK", 
    payload: book
  }
}