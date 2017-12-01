"use strict"
import React from 'react';
import { Row, Col, Well, Button } from 'react-bootstrap';

class BookItem extends React.Component {
  render() {
    return(
      <Well>
        <Row>
          <Col xs={12}>
            <h2>{this.props.title}</h2>
            <p>{this.props.description}</p>
            <h4>USD {this.props.price}</h4>
            <Button bsStyle='primary'>Add To Cart</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

export default BookItem;