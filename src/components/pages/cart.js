"use strict"
import React from 'react';
// when it is a smart component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, Row, Col, Button, ButtonGroup, Label } from 'react-bootstrap';
import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends React.Component {

  onIncrement(_id){
    this.props.updateCart(_id, 1);
  }
  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateCart(_id, -1);
    }
  }
  onDelete(_id){
    // Creating a copy of the current cart array
    const currentCartToDelete = this.props.cart;
    // Determine which index in cart array is the cart to be deleted
    const indexToDelete = currentCartToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    // Remove the cart at the specified index
    let cartAfterDelete = [ ...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)];

    this.props.deleteCartItem(cartAfterDelete);
  }
  render() {
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty(){
    return (<div></div>)
  }
  renderCart(){
    const cartItemList = this.props.cart.map(cartArr => {
      return(
        // MongoDB requirement to have _id
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h5>{cartArr.title}</h5>
            </Col>
            <Col xs={12} sm={2}>
              <h5>USD {cartArr.price}</h5>
            </Col>
            <Col xs={12} sm={2}>
              <h5>Qty. <Label bsStyle='success'>{cartArr.quantity}</Label></h5>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{ minWidth: '300px' }}>
                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle='default' bsSize='small'>-</Button>
                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle='default' bsSize='small'>+</Button>
                <span>    </span>
                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle='danger' bsSize='small'>DELETE</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)

    return(
      <Panel header='Cart' bsStyle='primary'>
        {cartItemList}
        <Row>
          <Col xs={12}>
            <h6>Total amount:</h6>
            <Button bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
      </Panel>
    )
  }
}

function mapStateToProps(state){
  return{
    cart: state.cart.cart,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteCartItem:deleteCartItem,
    updateCart:updateCart,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
