import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const CartWishlist = ({ type = 'cart', user, cartItems, setCartItems, likedItems, setLikedItems }) => {
  const navigate = useNavigate();
  const isCart = type === 'cart';
  const title = isCart ? 'Your Shopping Cart' : 'Your Wishlist';
  const sessionId = localStorage.getItem('sessionId') || uuidv4();
  const items = isCart ? cartItems : likedItems;
  const total = isCart ? items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) : 0;

  const deleteItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const apiBase = isCart ? 'cart' : 'liked';

      console.log(`Attempting to remove item from ${apiBase}:`, { productId, userId: user?.id, sessionId });

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

      console.log(`Response status for /api/${apiBase}/remove: ${response.status}`);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        console.log(`Content-Type: ${contentType}`);
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.log(`Non-JSON response body: ${text}`);
          throw new Error(
            `Server returned non-JSON response (status: ${response.status}). Please check if the server is running at http://localhost:5000 and the endpoint /api/${apiBase}/remove exists.`
          );
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to remove item from ${type} (status: ${response.status})`);
      }

      const data = await response.json();
      console.log(`Response data from /api/${apiBase}/remove:`, data);

      if (isCart) {
        setCartItems(data.cartItems?.map(item => ({
          id: item.productId || item._id,
          name: item.name,
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        })) || []);
      } else {
        setLikedItems(data.likedItems?.map(item => ({
          id: item.productId || item._id,
          name: item.name,
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        })) || []);
      }

      localStorage.setItem('sessionId', sessionId);
      toast.success(`Item removed from ${type}!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
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
      toast.error(err.message || `Failed to remove item from ${type}. Item removed locally.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
        toastId: `error-${productId}`,
      });
    }
  };

  const handleAction = async (productId, name) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = isCart ? '/api/cart/add' : '/api/liked/add';
      console.log(`Attempting action on ${endpoint}:`, { productId, userId: user?.id, sessionId });

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ productId, userId: user?.id, sessionId: !user ? sessionId : undefined }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Server returned non-JSON response (status: ${response.status})`);
        }
        const errorData = await response.json();
        throw new Error(errorData.message || (isCart ? 'Buy failed' : 'Add to cart failed'));
      }

      const data = await response.json();
      toast.success(data.message || (isCart ? `Purchased ${name}!` : `Added ${name} to cart!`), {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
        toastId: `action-${productId}`,
      });
      if (!isCart) {
        setCartItems(data.cartItems?.map(item => ({
          id: item.productId || item._id,
          name: item.name,
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        })) || []);
      }
    } catch (err) {
      console.error(`${isCart ? 'Buy' : 'Add to cart'} failed:`, err);
      toast.error(err.message || `Failed to ${isCart ? 'purchase' : 'add to cart'} item`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
        toastId: `error-action-${productId}`,
      });
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div className="container">
        <h1 className="text-center mb-4 text-warning fw-bold">{title}</h1>
        <div className="row">
          {items.length === 0 ? (
            <div className="col-12 text-center py-5">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffc107"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-3"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <p className="fs-5 text-dark">Your {title} is empty.</p>
              <p className="text-muted">
                You don't have any products in your {type} yet. Explore our shop for exciting products!
              </p>
              <button
                onClick={() => navigate('/products')}
                className="btn btn-warning btn-lg mt-3"
              >
                Return to Shop
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="col-12 mb-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-md-between p-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ width: '100px', height: 'auto' }}
                    />
                    <div className="flex-grow-1 mx-3 my-2 my-md-0">
                      <h5 className="card-title text-warning mb-2">{item.name}</h5>
                      <p className="card-text mb-1">Price: ₹{item.price.toFixed(2)}</p>
                      {isCart && <p className="card-text mb-1">Quantity: {item.quantity || 1}</p>}
                    </div>
                    <div className="d-flex flex-column flex-md-row gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleAction(item.id, item.name)}
                      >
                        {isCart ? 'Buy Now' : 'Add to Cart'}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {isCart && items.length > 0 && (
          <div className="text-end mt-4">
            <h4 className="text-warning fw-bold">Total: ₹{total.toFixed(2)}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartWishlist;