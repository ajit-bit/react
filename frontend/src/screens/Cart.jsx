import React, { useEffect, useState } from 'react';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = () => {
    fetch('http://localhost:5000/api/cart')
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          setCartItems([]);
          setTotal(0);
          return;
        }

        const calculatedTotal = data.reduce((sum, item) => sum + item.price, 0);
        setCartItems(data);
        setTotal(calculatedTotal);
      })
      .catch(err => {
        setCartItems(null); // Indicate error state
        console.error(err);
      });
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:5000/api/cart/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        alert('Item deleted!');
        loadCart();
      })
      .catch(err => console.error('Delete failed:', err));
  };

  const buyNow = (id, name) => {
    fetch(`http://localhost:5000/api/cart/buy/${id}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || `Purchased ${name}!`);
        loadCart();
      })
      .catch(err => {
        console.error('Buy failed:', err);
        alert('Buy failed!');
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className={styles.body}>
      <h1>Your Bag</h1>
      <div id="cart-container" className={styles.cartContainer}>
        {cartItems === null ? (
          <div>Error loading cart items.</div>
        ) : cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <svg
              className={styles.heartIcon}
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <p>Your Bag is empty.</p>
            <p className={styles.subtext}>
              You don't have any products in the bag yet. You will find a lot of interesting products on our "Shop" page.
            </p>
            <a href="/product.html" className={styles.shopButton}>RETURN TO SHOP</a>
          </div>
        ) : (
          cartItems.map(item => (
            <div key={item._id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} />
              <div className={styles.cartInfo}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
              </div>
              <div className={styles.buttons}>
                <button className={styles.buyBtn} onClick={() => buyNow(item._id, item.name)}>Buy Now</button>
                <button className={styles.deleteBtn} onClick={() => deleteItem(item._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.totalContainer}>Total: ₹{total}</div>
    </div>
  );
};

export default Cart;