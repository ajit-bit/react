import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../styles/CartWishlist.module.css';

const CartWishlist = ({ type = 'cart', user, cartItems, setCartItems, likedItems, setLikedItems }) => {
  const navigate = useNavigate();
  const isCart = type === 'cart';
  const title = isCart ? 'Your Shopping Cart' : 'Your Wishlist';
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  
  // Initialize sessionId
  const sessionId = localStorage.getItem('sessionId') || (() => {
    const newSessionId = uuidv4();
    localStorage.setItem('sessionId', newSessionId);
    return newSessionId;
  })();
  
  const items = isCart ? cartItems : likedItems;
  const total = isCart ? items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1 || updatingItem === productId) return;
    setUpdatingItem(productId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/cart/update', {
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
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Server returned non-JSON response (status: ${response.status})`);
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update quantity');
      }

      const data = await response.json();
      setCartItems(data.cartItems?.map(item => ({
        id: item.productId || item._id,
        name: item.name || 'Unknown Product',
        price: parseFloat(item.price || 0),
        imageUrl: item.imageUrl || '/images/default-product.jpg',
        quantity: item.quantity || 1,
      })) || []);

      toast.success('Quantity updated!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'light',
        toastId: `quantity-${productId}`,
      });
    } catch (err) {
      console.error('Quantity update failed:', err);
      toast.error(err.message || 'Failed to update quantity', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'light',
        toastId: `error-quantity-${productId}`,
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  const deleteItem = async (productId) => {
    if (updatingItem === productId) return;
    setUpdatingItem(productId);
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

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Server returned non-JSON response (status: ${response.status})`);
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to remove item from ${type}`);
      }

      const data = await response.json();
      if (isCart) {
        setCartItems(data.cartItems?.map(item => ({
          id: item.productId || item._id,
          name: item.name || 'Unknown Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        })) || []);
      } else {
        setLikedItems(data.likedItems?.map(item => ({
          id: item.productId || item._id,
          name: item.name || 'Unknown Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        })) || []);
      }

      toast.success(`Item removed from ${type}!`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'light',
        toastId: `remove-${productId}`,
      });
    } catch (err) {
      console.error(`Remove from ${type} failed:`, err);
      if (isCart) {
        setCartItems(cartItems.filter(item => item.id !== productId));
      } else {
        setLikedItems(likedItems.filter(item => item.id !== productId));
      }
      toast.error(`Failed to remove item from ${type}. Removed locally.`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'light',
        toastId: `error-${productId}`,
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleAction = async (productId, name, actionType) => {
    if (updatingItem === productId) return;
    setUpdatingItem(productId);
    try {
      const token = localStorage.getItem('token');
      const endpoint = actionType === 'buy' ? '/api/cart/buy' : actionType === 'cart' ? '/api/cart/add' : '/api/liked/add';
      const isMoveAction = (isCart && actionType === 'wishlist') || (!isCart && actionType === 'cart');
      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
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
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Server returned non-JSON response (status: ${response.status})`);
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${actionType === 'buy' ? 'purchase' : actionType === 'cart' ? 'add to cart' : 'save to wishlist'}`);
      }

      const data = await response.json();
      if (actionType === 'cart') {
        setCartItems(data.cartItems?.map(item => ({
          id: item.productId || item._id,
          name: item.name || 'Unknown Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        })) || []);
        if (isMoveAction) {
          setLikedItems(likedItems.filter(item => item.id !== productId));
        }
      } else if (actionType === 'wishlist') {
        setLikedItems(data.likedItems?.map(item => ({
          id: item.productId || item._id,
          name: item.name || 'Unknown Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        })) || []);
        if (isMoveAction) {
          setCartItems(cartItems.filter(item => item.id !== productId));
        }
      }

      toast.success(
        actionType === 'buy' ? `Purchased ${name}!` : actionType === 'cart' ? `Added ${name} to cart!` : `Saved ${name} to wishlist!`,
        {
          position: 'top-right',
          autoClose: 2000,
          theme: 'light',
          toastId: `action-${productId}-${actionType}`,
        }
      );
    } catch (err) {
      console.error(`${actionType} failed:`, err);
      toast.error(err.message || `Failed to ${actionType === 'buy' ? 'purchase' : actionType === 'cart' ? 'add to cart' : 'save to wishlist'}`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'light',
        toastId: `error-action-${productId}-${actionType}`,
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={3}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.items}>
          {isLoading ? (
            Array(3).fill().map((_, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardBody}>
                  <Skeleton width={100} height={100} circle={false} />
                  <div className={styles.cardContent}>
                    <Skeleton width={200} height={20} />
                    <Skeleton width={100} height={15} />
                    {isCart && <Skeleton width={80} height={30} />}
                  </div>
                  <div className={styles.cardActions}>
                    <Skeleton width={100} height={35} />
                    <Skeleton width={100} height={35} />
                  </div>
                </div>
              </div>
            ))
          ) : items.length === 0 ? (
            <div className={styles.emptyContainer}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4A017"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <p className={styles.emptyText}>Your {title} is empty.</p>
              <p className={styles.emptySubText}>
                Explore our collection to find something you love!
              </p>
              <button
                onClick={() => navigate('/products')}
                className={styles.continueButton}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={`${styles.card} ${updatingItem === item.id ? styles.updating : ''}`}>
                <div className={styles.cardBody}>
                  <img
                    src={item.imageUrl}
                    alt={item.name || 'Product'}
                    className={styles.productImage}
                  />
                  <div className={styles.cardContent}>
                    <h5 className={styles.cardTitle}>{item.name || 'Unknown Product'}</h5>
                    <p className={styles.cardPrice}>₹{(item.price || 0).toFixed(2)}</p>
                    {isCart && (
                      <div className={styles.quantitySelector}>
                        <button
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          disabled={updatingItem === item.id || (item.quantity || 1) <= 1}
                        >
                          -
                        </button>
                        <span className={styles.quantity}>{item.quantity || 1}</span>
                        <button
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          disabled={updatingItem === item.id}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.cardActions}>
                    {isCart ? (
                      <>
                        <button
                          className={styles.actionButton}
                          onClick={() => handleAction(item.id, item.name, 'buy')}
                          disabled={updatingItem === item.id}
                        >
                          Buy Now
                        </button>
                        <button
                          className={styles.secondaryButton}
                          onClick={() => handleAction(item.id, item.name, 'wishlist')}
                          disabled={updatingItem === item.id}
                        >
                          Save to Wishlist
                        </button>
                      </>
                    ) : (
                      <button
                        className={styles.actionButton}
                        onClick={() => handleAction(item.id, item.name, 'cart')}
                        disabled={updatingItem === item.id}
                      >
                        Add to Cart
                      </button>
                    )}
                    <button
                      className={styles.removeButton}
                      onClick={() => deleteItem(item.id)}
                      disabled={updatingItem === item.id}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {isCart && items.length > 0 && !isLoading && (
          <div className={styles.checkoutSection}>
            <h4 className={styles.subtotal}>Subtotal: ₹{total.toFixed(2)}</h4>
            <button
              className={styles.checkoutButton}
              onClick={() => navigate('/checkout')}
              disabled={updatingItem}
            >
              Proceed to Checkout
            </button>
            <button
              className={styles.continueButton}
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartWishlist;