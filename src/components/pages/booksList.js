"use strict"
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { getBooks } from '../../actions/bookActions';
import { Carousel, Grid, Row, Col, Button } from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component {
  componentDidMount() {
    // Dispatches an action
    this.props.getBooks();
  }
 render() {

  console.log("HOW STATE LOOKS LIKE", this.props.state);
  console.log("HOW STATE.BOOKS LOOKS LIKE", this.props.stateBooks);
  console.log("HOW STATE.BOOKS.BOOKS LOOKS LIKE", this.props.stateBooksBooks);

  const booksList = this.props.books.map(function(booksArr){
    return(
      <Col xs={12} sm={6} md={4} key={booksArr._id}>
        <BookItem 
          _id={booksArr._id}
          title={booksArr.title}
          description={booksArr.description}
          images={booksArr.images}
          price={booksArr.price}
          discount={booksArr.discount}
        />
      </Col>
    )
  })
  return(
    <Grid>
          <Row>
            <Carousel>
              <Carousel.Item>
                <img width={900} height={300} alt="900x300" src="/images/home1.jpg" style={{maxHeight: 300}}/>
                <Carousel.Caption>
                  <h3>Simple Shopping Cart</h3>
                  <p>React, Redux, Express, Mongodb</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={300} alt="900x300" src="/images/home2.jpg"  style={{maxHeight: 300}}/>
                <Carousel.Caption>
                  <h3>Books And More Books</h3>
                  <p>Creating the books and adding them to a cart</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row>
            <Cart />
          </Row>
          <Row style={{marginTop:'15px'}}>
              {booksList}
          </Row>
        </Grid>
  )
 }
}

function mapStateToProps(state){
  return{
    books: state.books.books
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBooks: getBooks,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);