// src/components/Cart.jsx
import React from "react";

const Cart = ({ cartItems, onRemoveFromCart, onOrder }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="border-b py-2 flex justify-between items-center"
              >
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button onClick={() => onRemoveFromCart(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-semibold">Total: ${total}</p>
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={onOrder}
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
