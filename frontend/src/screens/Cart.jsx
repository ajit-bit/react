import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

  const checkLoginStatus = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await loadCart(data.user.id);
      } else {
        setUser(null);
        setCartItems([]);
        setTotal(0);
        toast.error('Please log in to view your cart', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error('Error checking login status:', err);
      setUser(null);
      setCartItems([]);
      setTotal(0);
      toast.error('Failed to check login status', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const loadCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setCartItems([]);
          setTotal(0);
          return;
        }
        const calculatedTotal = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setCartItems(data);
        setTotal(calculatedTotal);
      } else {
        throw new Error('Failed to fetch cart items');
      }
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setCartItems([]);
      setTotal(0);
      toast.error('Failed to load cart items', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        toast.success('Item deleted from cart!', {
          position: 'top-right',
          autoClose: 3000,
        });
        await loadCart(user.id);
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete item', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const buyNow = async (id, name) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/buy/${id}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || `Purchased ${name}!`, {
          position: 'top-right',
          autoClose: 3000,
        });
        await loadCart(user.id);
      } else {
        throw new Error('Buy failed');
      }
    } catch (err) {
      console.error('Buy failed:', err);
      toast.error('Failed to purchase item', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div className={styles.body}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>Your Bag</h1>
      <div id="cart-container" className={styles.cartContainer}>
        {!user ? (
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
            <p>Please log in to view your cart.</p>
            <a href="/auth" className={styles.shopButton}>Log In</a>
          </div>
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
            <a href="/products" className={styles.shopButton}>RETURN TO SHOP</a>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartImage} />
              <div className={styles.cartInfo}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.buyBtn}
                  onClick={() => buyNow(item._id, item.name)}
                >
                  Buy Now
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className={styles.totalContainer}>Total: ₹{total.toFixed(2)}</div>
      )}
    </div>
  );
};

export default Cart;