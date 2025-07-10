import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Product.module.css';
import women1 from '../assets/images/women1.jpg';
import men1 from '../assets/images/men1.jpg';
import ring1 from '../assets/images/ring1.jpg';
import earring from '../assets/images/earring.png';
import earring1 from '../assets/images/earring1.jpg';
import necklace from '../assets/images/ring.png';
import necklace1 from '../assets/images/ring1.jpg';
import ring from '../assets/images/ring.png';
import bracelet from '../assets/images/bracelet.png';
import bracelet1 from '../assets/images/bracelet1.jpg';

const Product = ({ setCartItems, setLikedItems }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [loading, setLoading] = useState({ cart: false, wishlist: false });
  const sessionId = localStorage.getItem('sessionId') || uuidv4();
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Consolidated product data from Women.jsx, Men.jsx, and Category.jsx
  const allProducts = [
    // From Women.jsx
    { id: '507f1f77bcf86cd799439071', name: 'Elegant Rose Ring', originalPrice: 1200, currentPrice: 949, reviews: 14, rating: 5, image: ring1, hoverImage: women1, description: 'A delicate rose gold ring with intricate floral detailing, perfect for everyday elegance or special occasions.', category: 'rings' },
    { id: '507f1f77bcf86cd799439072', name: 'Pearl Stud Necklace', originalPrice: 1000, currentPrice: 799, reviews: 9, rating: 4, image: ring1, hoverImage: women1, description: 'Elegant pearl stud necklace for a classic look.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439073', name: 'Crystal Charm Bracelet', originalPrice: 950, currentPrice: 749, reviews: 6, rating: 4, image: ring1, hoverImage: women1, description: 'Sparkling crystal charm bracelet for everyday wear.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439074', name: 'Golden Glow Earrings', originalPrice: 850, currentPrice: 699, reviews: 5, rating: 3, image: ring1, hoverImage: women1, description: 'Radiant gold earrings with a modern twist.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439075', name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4, image: ring1, hoverImage: women1, description: 'Opal-accented necklace with a celestial glow.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439076', name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4, image: ring1, hoverImage: women1, description: 'Gold ring inspired by twilight hues.', category: 'rings' },
    { id: '507f1f77bcf86cd799439077', name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3, image: ring1, hoverImage: women1, description: 'Elegant crystal drop earrings for special occasions.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439078', name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5, image: ring1, hoverImage: women1, description: 'Bold silver cuff with lunar-inspired design.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439079', name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4, image: ring1, hoverImage: women1, description: 'Opal-accented necklace with a celestial glow.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439080', name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4, image: ring1, hoverImage: women1, description: 'Gold ring inspired by twilight hues.', category: 'rings' },
    { id: '507f1f77bcf86cd799439081', name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3, image: ring1, hoverImage: women1, description: 'Elegant crystal drop earrings for special occasions.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439082', name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5, image: ring1, hoverImage: women1, description: 'Bold silver cuff with lunar-inspired design.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439083', name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4, image: ring1, hoverImage: women1, description: 'Opal-accented necklace with a celestial glow.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439084', name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4, image: ring1, hoverImage: women1, description: 'Gold ring inspired by twilight hues.', category: 'rings' },
    { id: '507f1f77bcf86cd799439085', name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3, image: ring1, hoverImage: women1, description: 'Elegant crystal drop earrings for special occasions.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439086', name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5, image: ring1, hoverImage: women1, description: 'Bold silver cuff with lunar-inspired design.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439087', name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4, image: ring1, hoverImage: women1, description: 'Opal-accented necklace with a celestial glow.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439088', name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4, image: ring1, hoverImage: women1, description: 'Gold ring inspired by twilight hues.', category: 'rings' },
    { id: '507f1f77bcf86cd799439089', name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3, image: ring1, hoverImage: women1, description: 'Elegant crystal drop earrings for special occasions.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439090', name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5, image: ring1, hoverImage: women1, description: 'Bold silver cuff with lunar-inspired design.', category: 'bracelets' },
    // From Men.jsx
    { id: '507f1f77bcf86cd799439051', name: 'Silver Voltage Necklace', originalPrice: 720, currentPrice: 549, reviews: 12, rating: 4, image: ring1, hoverImage: men1, description: 'Bold silver necklace with a modern design, ideal for a striking masculine look.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439052', name: 'Black Voltage Necklace', originalPrice: 900, currentPrice: 599, reviews: 4, rating: 4, image: ring1, hoverImage: men1, description: 'Sleek black necklace for a bold statement.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439053', name: 'Bag Mitts Golden Chain', originalPrice: 1050, currentPrice: 749, reviews: 2, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a sporty edge.', category: 'chains' },
    { id: '507f1f77bcf86cd799439054', name: 'Bag Mitts Silver Cuff', originalPrice: 1300, currentPrice: 699, reviews: 4, rating: 2, image: ring1, hoverImage: men1, description: 'Silver cuff for a rugged look.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439055', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1, description: 'Edgy silver chain with a bold design.', category: 'chains' },
    { id: '507f1f77bcf86cd799439056', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a striking look.', category: 'chains' },
    { id: '507f1f77bcf86cd799439057', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1, description: 'Golden earrings with diamond accents.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439058', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1, description: 'Unique silver chain with a leaf motif.', category: 'chains' },
    { id: '507f1f77bcf86cd799439059', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1, description: 'Edgy silver chain with a bold design.', category: 'chains' },
    { id: '507f1f77bcf86cd799439060', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a striking look.', category: 'chains' },
    { id: '507f1f77bcf86cd799439061', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1, description: 'Golden earrings with diamond accents.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439062', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1, description: 'Unique silver chain with a leaf motif.', category: 'chains' },
    { id: '507f1f77bcf86cd799439063', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1, description: 'Edgy silver chain with a bold design.', category: 'chains' },
    { id: '507f1f77bcf86cd799439064', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a striking look.', category: 'chains' },
    { id: '507f1f77bcf86cd799439065', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1, description: 'Golden earrings with diamond accents.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439066', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1, description: 'Unique silver chain with a leaf motif.', category: 'chains' },
    { id: '507f1f77bcf86cd799439067', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1, description: 'Edgy silver chain with a bold design.', category: 'chains' },
    { id: '507f1f77bcf86cd799439068', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a striking look.', category: 'chains' },
    { id: '507f1f77bcf86cd799439069', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1, description: 'Golden earrings with diamond accents.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439070', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1, description: 'Unique silver chain with a leaf motif.', category: 'chains' },
    // From Category.jsx
    { id: '507f1f77bcf86cd799439010', name: 'Elegant Drop Earrings - Silver', originalPrice: 800, currentPrice: 649, reviews: 520, rating: 4.7, image: earring, hoverImage: earring1, description: 'Elegant silver drop earrings for a sophisticated look.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439011', name: 'Elegant Drop Earrings - Silver', originalPrice: 800, currentPrice: 649, reviews: 520, rating: 4.7, image: earring, hoverImage: earring1, description: 'Elegant silver drop earrings for a sophisticated look.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439012', name: 'Elegant Drop Earrings - Silver', originalPrice: 800, currentPrice: 649, reviews: 520, rating: 4.7, image: earring, hoverImage: earring1, description: 'Elegant silver drop earrings for a sophisticated look.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439013', name: 'Elegant Drop Earrings - Silver', originalPrice: 800, currentPrice: 649, reviews: 520, rating: 4.7, image: earring, hoverImage: earring1, description: 'Elegant silver drop earrings for a sophisticated look.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439014', name: 'Elegant Drop Earrings - Silver', originalPrice: 800, currentPrice: 649, reviews: 520, rating: 4.7, image: earring, hoverImage: earring1, description: 'Elegant silver drop earrings for a sophisticated look.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439015', name: 'Elegant Drop Earrings - Silver', originalPrice: 800, currentPrice: 649, reviews: 520, rating: 4.7, image: earring, hoverImage: earring1, description: 'Elegant silver drop earrings for a sophisticated look.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439016', name: 'Elegant Drop Earrings - Silver', originalPrice: 800, currentPrice: 649, reviews: 520, rating: 4.7, image: earring, hoverImage: earring1, description: 'Elegant silver drop earrings for a sophisticated look.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439017', name: 'Elegant Drop Earrings - Silver', originalPrice: 800, currentPrice: 649, reviews: 520, rating: 4.7, image: earring, hoverImage: earring1, description: 'Elegant silver drop earrings for a sophisticated look.', category: 'earrings' },
    { id: '507f1f77bcf86cd799439020', name: 'Radiant Gem Necklace - Gold', originalPrice: 1500, currentPrice: 1299, reviews: 820, rating: 4.8, image: necklace, hoverImage: necklace1, description: 'Gold necklace with radiant gemstones.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439021', name: 'Radiant Gem Necklace - Gold', originalPrice: 1500, currentPrice: 1299, reviews: 820, rating: 4.8, image: necklace, hoverImage: necklace1, description: 'Gold necklace with radiant gemstones.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439022', name: 'Radiant Gem Necklace - Gold', originalPrice: 1500, currentPrice: 1299, reviews: 820, rating: 4.8, image: necklace, hoverImage: necklace1, description: 'Gold necklace with radiant gemstones.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439023', name: 'Radiant Gem Necklace - Gold', originalPrice: 1500, currentPrice: 1299, reviews: 820, rating: 4.8, image: necklace, hoverImage: necklace1, description: 'Gold necklace with radiant gemstones.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439024', name: 'Radiant Gem Necklace - Gold', originalPrice: 1500, currentPrice: 1299, reviews: 820, rating: 4.8, image: necklace, hoverImage: necklace1, description: 'Gold necklace with radiant gemstones.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439025', name: 'Radiant Gem Necklace - Gold', originalPrice: 1500, currentPrice: 1299, reviews: 820, rating: 4.8, image: necklace, hoverImage: necklace1, description: 'Gold necklace with radiant gemstones.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439026', name: 'Radiant Gem Necklace - Gold', originalPrice: 1500, currentPrice: 1299, reviews: 820, rating: 4.8, image: necklace, hoverImage: necklace1, description: 'Gold necklace with radiant gemstones.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439027', name: 'Radiant Gem Necklace - Gold', originalPrice: 1500, currentPrice: 1299, reviews: 820, rating: 4.8, image: necklace, hoverImage: necklace1, description: 'Gold necklace with radiant gemstones.', category: 'necklaces' },
    { id: '507f1f77bcf86cd799439030', name: 'Girl Boss Salty Watch Ring - Rose Gold', originalPrice: 900, currentPrice: 749, reviews: 670, rating: 4.5, image: ring, hoverImage: ring1, description: 'Rose gold ring with a bold, modern design.', category: 'rings' },
    { id: '507f1f77bcf86cd799439031', name: 'Girl Boss Salty Watch Ring - Rose Gold', originalPrice: 900, currentPrice: 749, reviews: 670, rating: 4.5, image: ring, hoverImage: ring1, description: 'Rose gold ring with a bold, modern design.', category: 'rings' },
    { id: '507f1f77bcf86cd799439032', name: 'Girl Boss Salty Watch Ring - Rose Gold', originalPrice: 900, currentPrice: 749, reviews: 670, rating: 4.5, image: ring, hoverImage: ring1, description: 'Rose gold ring with a bold, modern design.', category: 'rings' },
    { id: '507f1f77bcf86cd799439033', name: 'Girl Boss Salty Watch Ring - Rose Gold', originalPrice: 900, currentPrice: 749, reviews: 670, rating: 4.5, image: ring, hoverImage: ring1, description: 'Rose gold ring with a bold, modern design.', category: 'rings' },
    { id: '507f1f77bcf86cd799439034', name: 'Girl Boss Salty Watch Ring - Rose Gold', originalPrice: 900, currentPrice: 749, reviews: 670, rating: 4.5, image: ring, hoverImage: ring1, description: 'Rose gold ring with a bold, modern design.', category: 'rings' },
    { id: '507f1f77bcf86cd799439035', name: 'Girl Boss Salty Watch Ring - Rose Gold', originalPrice: 900, currentPrice: 749, reviews: 670, rating: 4.5, image: ring, hoverImage: ring1, description: 'Rose gold ring with a bold, modern design.', category: 'rings' },
    { id: '507f1f77bcf86cd799439036', name: 'Girl Boss Salty Watch Ring - Rose Gold', originalPrice: 900, currentPrice: 749, reviews: 670, rating: 4.5, image: ring, hoverImage: ring1, description: 'Rose gold ring with a bold, modern design.', category: 'rings' },
    { id: '507f1f77bcf86cd799439037', name: 'Girl Boss Salty Watch Ring - Rose Gold', originalPrice: 900, currentPrice: 749, reviews: 670, rating: 4.5, image: ring, hoverImage: ring1, description: 'Rose gold ring with a bold, modern design.', category: 'rings' },
    { id: '507f1f77bcf86cd799439040', name: 'Elegant Charm Bracelet - Silver', originalPrice: 1200, currentPrice: 999, reviews: 540, rating: 4.7, image: bracelet, hoverImage: bracelet1, description: 'A luxurious silver charm bracelet with heart-shaped pendants, crafted for elegance and sophistication.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439041', name: 'Elegant Charm Bracelet - Silver', originalPrice: 1200, currentPrice: 999, reviews: 540, rating: 4.7, image: bracelet, hoverImage: bracelet1, description: 'A luxurious silver charm bracelet with heart-shaped pendants, crafted for elegance and sophistication.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439042', name: 'Elegant Charm Bracelet - Silver', originalPrice: 1200, currentPrice: 999, reviews: 540, rating: 4.7, image: bracelet, hoverImage: bracelet1, description: 'A luxurious silver charm bracelet with heart-shaped pendants, crafted for elegance and sophistication.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439043', name: 'Elegant Charm Bracelet - Silver', originalPrice: 1200, currentPrice: 999, reviews: 540, rating: 4.7, image: bracelet, hoverImage: bracelet1, description: 'A luxurious silver charm bracelet with heart-shaped pendants, crafted for elegance and sophistication.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439044', name: 'Elegant Charm Bracelet - Silver', originalPrice: 1200, currentPrice: 999, reviews: 540, rating: 4.7, image: bracelet, hoverImage: bracelet1, description: 'A luxurious silver charm bracelet with heart-shaped pendants, crafted for elegance and sophistication.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439045', name: 'Elegant Charm Bracelet - Silver', originalPrice: 1200, currentPrice: 999, reviews: 540, rating: 4.7, image: bracelet, hoverImage: bracelet1, description: 'A luxurious silver charm bracelet with heart-shaped pendants, crafted for elegance and sophistication.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439046', name: 'Elegant Charm Bracelet - Silver', originalPrice: 1200, currentPrice: 999, reviews: 540, rating: 4.7, image: bracelet, hoverImage: bracelet1, description: 'A luxurious silver charm bracelet with heart-shaped pendants, crafted for elegance and sophistication.', category: 'bracelets' },
    { id: '507f1f77bcf86cd799439047', name: 'Elegant Charm Bracelet - Silver', originalPrice: 1200, currentPrice: 999, reviews: 540, rating: 4.7, image: bracelet, hoverImage: bracelet1, description: 'A luxurious silver charm bracelet with heart-shaped pendants, crafted for elegance and sophistication.', category: 'bracelets' },
  ];

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }
    checkLoginStatus();
    fetchProduct();
  }, [productId]);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        await fetchLikedItems(sessionId);
        return;
      }
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await fetchLikedItems(data.user.id);
      } else {
        localStorage.removeItem('token');
        setUser(null);
        await fetchLikedItems(sessionId);
        toast.error("Session expired, please log in again", {
          className: styles['product-theme-toast'],
        });
      }
    } catch (err) {
      console.error("Error checking login status", err);
      setUser(null);
      await fetchLikedItems(sessionId);
      toast.error("Failed to check login status", {
        className: styles['product-theme-toast'],
      });
    }
  };

  const fetchProduct = () => {
    const foundProduct = allProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
    } else {
      toast.error("Product not found", { className: styles['product-theme-toast'] });
      navigate('/products');
    }
  };

  const fetchCartItems = async (identifier) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`http://localhost:5000/api/cart/${identifier}`, {
        credentials: "include",
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item._id,
          name: item.name || 'Unnamed Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        }));
        setCartItems(normalizedItems);
      } else {
        throw new Error("Failed to fetch cart items");
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setCartItems([]);
      toast.error("Failed to fetch cart items", {
        className: styles['product-theme-toast'],
      });
    }
  };

  const fetchLikedItems = async (identifier) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`http://localhost:5000/api/liked/${identifier}`, {
        credentials: "include",
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item._id,
          name: item.name || 'Unnamed Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
        }));
        setLikedItems(normalizedItems);
        setLikedProducts(new Set(normalizedItems.map(item => item.id)));
      } else {
        throw new Error("Failed to fetch liked items");
      }
    } catch (err) {
      console.error("Error fetching liked items:", err);
      setLikedItems([]);
      toast.error("Failed to fetch liked items", {
        className: styles['product-theme-toast'],
      });
    }
  };

  const addToCart = async (productId) => {
    if (!product) {
      toast.error("Product not found", { className: styles['product-theme-toast'] });
      return;
    }

    setLoading(prev => ({ ...prev, cart: true }));
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const body = user
        ? { productId, name: product.name, price: product.currentPrice, imageUrl: product.image }
        : { productId, name: product.name, price: product.currentPrice, imageUrl: product.image, sessionId };
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        await fetchCartItems(user ? user.id : sessionId);
        toast.success("Added to Cart!", {
          className: styles['product-theme-toast'],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.message || "Failed to add to cart", {
        className: styles['product-theme-toast'],
      });
    } finally {
      setLoading(prev => ({ ...prev, cart: false }));
    }
  };

  const addToWishlist = async (productId) => {
    if (!product) {
      toast.error("Product not found", { className: styles['product-theme-toast'] });
      return;
    }

    setLoading(prev => ({ ...prev, wishlist: true }));
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const endpoint = likedProducts.has(productId) ? "/api/liked/remove" : "/api/liked/add";
      const body = user
        ? { productId, name: product.name, price: product.currentPrice, imageUrl: product.image }
        : { productId, name: product.name, price: product.currentPrice, imageUrl: product.image, sessionId };
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        await fetchLikedItems(user ? user.id : sessionId);
        toast.success(likedProducts.has(productId) ? "Removed from Wishlist!" : "Added to Wishlist!", {
          className: styles['product-theme-toast'],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error(err.message || "Failed to update wishlist", {
        className: styles['product-theme-toast'],
      });
    } finally {
      setLoading(prev => ({ ...prev, wishlist: false }));
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${styles.star} ${
          i < Math.floor(rating)
            ? styles.filled
            : i < rating
            ? styles['half-filled']
            : ''
        }`}
      />
    ));
  };

  if (!product) {
    return <div className="container text-center py-5">Loading...</div>;
  }

  return (
    <div className={`${styles['product-page']} container-fluid px-0 py-4`} style={{ paddingTop: '120px' }}>
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
        theme="light"
      />
      <div className="container">
        {/* Back Button */}
        <button
          className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className={styles['back-icon']} />
          <span>Back</span>
        </button>
        <div className="row g-4">
          {/* Image Section */}
          <div className="col-lg-6">
            <div className={styles['image-container']}>
              <img
                src={selectedImage}
                alt={product.name}
                className={`${styles['main-image']} w-100 h-auto object-fit-contain rounded`}
              />
              <div className="d-flex flex-wrap gap-2 mt-3">
                {[product.image, product.hoverImage].map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className={`${styles['thumbnail-image']} rounded cursor-pointer`}
                    onClick={() => setSelectedImage(img)}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', border: selectedImage === img ? '2px solid #ffc107' : '1px solid #ddd' }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Details Section */}
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold mb-3">{product.name}</h1>
            <div className="d-flex align-items-center mb-3">
              <div className={styles['stars-container']}>{renderStars(product.rating)}</div>
              <span className="ms-2 text-muted">{product.reviews} reviews</span>
            </div>
            <div className={styles['price-container']}>
              <span className={styles['current-price']}>Rs. {product.currentPrice.toFixed(2)}</span>
              <span className={styles['original-price']}>Rs. {product.originalPrice.toFixed(2)}</span>
            </div>
            <p className="text-muted my-4">{product.description}</p>
            <div className="d-flex align-items-center gap-2 mb-4">
              <button
                className="btn btn-warning text-dark fw-bold flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => addToCart(product.id)}
                disabled={loading.cart}
              >
                <ShoppingBag className={styles['bag-icon']} />
                <span>{loading.cart ? 'Adding...' : 'Add to Bag'}</span>
              </button>
              <button
                onClick={() => addToWishlist(product.id)}
                className={`btn btn-outline-secondary rounded-circle p-2 ${likedProducts.has(product.id) ? styles.liked : ''}`}
                disabled={loading.wishlist}
              >
                <Heart
                  className={`${styles['heart-icon']} ${likedProducts.has(product.id) ? styles.liked : ''}`}
                />
              </button>
            </div>
            <div>
              <h5>Category</h5>
              <p className="text-capitalize">{product.category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;