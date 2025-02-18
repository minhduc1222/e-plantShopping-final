import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;

    cart.forEach((item) => {
        const itemCost = parseItemCostToInteger(item.cost);
        totalCost += itemCost * item.quantity;
    });

    return totalCost;
  };
    const parseItemCostToInteger = (itemCost) => {
        return parseInt(itemCost.replace('$', ''), 10);
}
  const handleContinueShopping = (e) => {
    onContinueShopping(e)
  };



  const handleIncrement = (item) => {
    const updatedItem = {...item, quantity: item.quantity + 1 }
    dispatch(updateQuantity(updatedItem))
  };

  const handleDecrement = (item) => {
    const updatedItem = {...item, quantity: Math.max(item.quantity - 1, 1) } // Ensure quantity is never negative
    dispatch(updateQuantity(updatedItem))
  };

  const handleRemove = (item) => {
    const updatedItem = {...item, quantity: 0 } // Ensure quantity is never negative
    dispatch(removeItem(updatedItem))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalCost = 0;
    const itemCost = parseItemCostToInteger(item.cost);
    totalCost = item.quantity * itemCost;

    return totalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Plantas Diferentes : {cart.length}</h2>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


