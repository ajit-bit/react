import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/CartWishlist.module.css';
import { v4 as uuidv4 } from 'uuid';

const CartWishlist = ({ type = 'cart', user, cartItems, setCartItems, likedItems, setLikedItems }) => {
  const navigate = useNavigate();
  const isCart = type === 'cart';
  const title = isCart ? 'Your Bag' : 'Your Wishlist';
  const sessionId = localStorage.getItem('sessionId') || uuidv4();
  const items = isCart ? cartItems : likedItems;
  const total = isCart ? items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) : 0;

  const deleteItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const apiBase = isCart ? 'cart' : 'liked';
      const response = await fetch(`http://localhost:5000/api/${apiBase}/remove`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          productId,
          userId: user?.id,
          sessionId: !user ? sessionId : undefined,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (isCart) {
          setCartItems(data.cartItems.map(item => ({
            id: item.productId || item.id,
            name: item.product?.name || item.name,
            price: parseFloat(item.product?.price || item.price || 0),
            imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg',
            quantity: item.quantity || 1,
          })));
        } else {
          setLikedItems(data.likedItems.map(item => ({
            id: item.productId || item.id,
            name: item.product?.name || item.name,
            price: parseFloat(item.product?.price || item.price || 0),
            imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg',
            quantity: item.quantity || 1,
          })));
        }
        toast.success(`Item removed from ${type}!`, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to remove item from ${type}`);
      }
    } catch (err) {
      console.error(`Remove from ${type} failed:`, err);
      toast.error(err.message || `Failed to remove item from ${type}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleAction = async (productId, name) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = isCart ? '/api/cart/add' : '/api/liked/add';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ productId, userId: user?.id, sessionId: !user ? sessionId : undefined }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || (isCart ? `Purchased ${name}!` : `Added ${name} to cart!`), {
          position: 'top-right',
          autoClose: 3000,
        });
        if (!isCart) {
          setCartItems(data.cartItems.map(item => ({
            id: item.productId || item.id,
            name: item.product?.name || item.name,
            price: parseFloat(item.product?.price || item.price || 0),
            imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg',
            quantity: item.quantity || 1,
          })));
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || (isCart ? 'Buy failed' : 'Add to cart failed'));
      }
    } catch (err) {
      console.error(`${isCart ? 'Buy' : 'Add to cart'} failed:`, err);
      toast.error(err.message || `Failed to ${isCart ? 'purchase' : 'add to cart'} item`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

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
      <h1>{title}</h1>
      <div id={`${type}-container`} className={styles.container}>
        {items.length === 0 ? (
          <div className={styles.empty}>
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
            <p>Your {title} is empty.</p>
            <p className={styles.subtext}>
              You don't have any products in your {type} yet. You will find a lot of interesting products on our "Shop" page.
            </p>
            <button onClick={() => navigate('/products')} className={styles.shopButton}>RETURN TO SHOP</button>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.imageUrl} alt={item.name} className={styles.image} />
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price.toFixed(2)}</p>
                {isCart && <p>Quantity: {item.quantity || 1}</p>}
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleAction(item.productId, item.name)}
                >
                  {isCart ? 'Buy Now' : 'Add to Cart'}
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {isCart && items.length > 0 && (
        <div className={styles.totalContainer}>Total: ₹{total.toFixed(2)}</div>
      )}
    </div>
  );
};

export default CartWishlist;