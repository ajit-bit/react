// src/components/Product.jsx

import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeft, Check, ChevronDown, Heart, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Product.module.css';

// ... (keep all your image imports)
import bracelet from '../assets/images/bracelet.png';
import bracelet1 from '../assets/images/bracelet1.jpg';
import earring from '../assets/images/earring.png';
import earring1 from '../assets/images/earring1.jpg';
import men1 from '../assets/images/men1.jpg';
import { default as necklace, default as ring } from '../assets/images/ring.png';
import { default as necklace1, default as ring1 } from '../assets/images/ring1.jpg';
import women1 from '../assets/images/women1.jpg';


const chProduct = ({ setCartItems, setLikedItems }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [loading, setLoading] = useState({ cart: false, wishlist: false });
  const sessionId = localStorage.getItem('sessionId') || uuidv4();
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('description');

  // ... (keep your allProducts array exactly the same)
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
  // ... (keep all your useEffects and data fetching functions here)
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
          className: styles.toastError,
        });
      }
    } catch (err) {
      console.error("Error checking login status", err);
      setUser(null);
      await fetchLikedItems(sessionId);
      toast.error("Failed to check login status", {
        className: styles.toastError,
      });
    }
  };

  const fetchProduct = () => {
    const foundProduct = allProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
    } else {
      toast.error("Product not found", { className: styles.toastError });
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
        className: styles.toastError,
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
        className: styles.toastError,
      });
    }
  };
  
  const handleAddToCart = async () => {
    if (!product || isAdded) return;

    setLoading(prev => ({ ...prev, cart: true }));
    try {
      // ... (API call logic is the same)
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const body = {
        productId: product.id,
        name: product.name,
        price: product.currentPrice,
        imageUrl: product.image,
        quantity,
        ...(user ? {} : { sessionId })
      };
      
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchCartItems(user ? user.id : sessionId);
        toast.success("Added to Bag!", {
          className: styles.toastSuccess,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.message || "Failed to add to cart", { className: styles.toastError });
    } finally {
      setLoading(prev => ({ ...prev, cart: false }));
    }
  };

  const addToWishlist = async (productId) => {
    if (!product) {
      toast.error("Product not found", { className: styles.toastError });
      return;
    }

    setLoading(prev => ({ ...prev, wishlist: true }));
    try {
      // ... (API call logic is the same)
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
        const message = likedProducts.has(productId) ? "Removed from Wishlist!" : "Added to Wishlist!";
        toast.success(message, {
          className: styles.toastSuccess,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error(err.message || "Failed to update wishlist", { className: styles.toastError });
    } finally {
      setLoading(prev => ({ ...prev, wishlist: false }));
    }
  };

  // --- HELPER FUNCTIONS MOVED HERE ---
  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => <Star key={i} className={`${styles.star} ${i < rating ? styles.filled : ''}`} />);
  
  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const calculateDiscount = (original, current) => {
    if (original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  // --- RENDER LOGIC STARTS HERE ---
  if (!product) {
    return <div className="container text-center py-5">Loading...</div>;
  }
  
  const discount = calculateDiscount(product.originalPrice, product.currentPrice);

  return (
    <div className={styles.productPage}>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="container">
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>Back to products</span>
        </button>
        <div className="row g-4 g-lg-5">
          <div className="col-lg-6">
            <div className={styles.imagePanel}>
              <div className={styles.imageZoomContainer}>
                <img key={selectedImage} src={selectedImage} alt={product.name} className={styles.mainImage} />
              </div>
              <div className={styles.thumbnailContainer}>
                {[product.image, product.hoverImage].filter(Boolean).map((img, index) => (
                  <img key={index} src={img} alt={`${product.name} view ${index + 1}`} className={`${styles.thumbnailImage} ${selectedImage === img ? styles.thumbnailActive : ''}`} onClick={() => setSelectedImage(img)} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles.detailsPanel}>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <div className={styles.reviewContainer}>
                <div className={styles.starsContainer}>{renderStars(product.rating)}</div>
                <a href="#reviews" className={styles.reviewCount}>{product.reviews} reviews</a>
              </div>
              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>Rs. {product.currentPrice.toFixed(2)}</span>
                <span className={styles.originalPrice}>Rs. {product.originalPrice.toFixed(2)}</span>
                {discount > 0 && <span className={styles.discountBadge}>{discount}% OFF</span>}
              </div>
              
              <div className={styles.actionsGrid}>
                <div className={styles.quantitySelector}>
                  <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
                  <input type="text" value={quantity} readOnly />
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
                <button
                  className={`${styles.addToCartButton} ${isAdded ? styles.addedToCartButton : ''}`}
                  onClick={handleAddToCart}
                  disabled={loading.cart || isAdded}
                >
                  {isAdded ? (
                    <>
                      <Check size={22} />
                      <span>Added!</span>
                    </>
                  ) : loading.cart ? (
                    <span>Adding...</span>
                  ) : (
                    <>
                      <ShoppingBag size={22} />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
                <button onClick={() => addToWishlist(product.id)} className={`${styles.wishlistButton} ${likedProducts.has(product.id) ? styles.liked : ''}`} disabled={loading.wishlist} aria-label="Add to wishlist">
                  <Heart className={styles.heartIcon} size={22} />
                </button>
              </div>

              <div className={styles.accordion}>
                <div className={styles.accordionItem}>
                  <button className={styles.accordionHeader} onClick={() => setOpenAccordion(openAccordion === 'description' ? null : 'description')}>
                    <span>Product Description</span>
                    <ChevronDown className={`${styles.accordionIcon} ${openAccordion === 'description' ? styles.accordionIconOpen : ''}`} />
                  </button>
                  <div className={`${styles.accordionContent} ${openAccordion === 'description' ? styles.accordionContentOpen : ''}`}>
                    <p>{product.description}</p>
                  </div>
                </div>
                <div className={styles.accordionItem}>
                  <button className={styles.accordionHeader} onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}>
                    <span>Materials & Care</span>
                    <ChevronDown className={`${styles.accordionIcon} ${openAccordion === 'details' ? styles.accordionIconOpen : ''}`} />
                  </button>
                  <div className={`${styles.accordionContent} ${openAccordion === 'details' ? styles.accordionContentOpen : ''}`}>
                    <p>Crafted from premium 925 Sterling Silver with 18k Gold Plating. To maintain its shine, avoid contact with perfumes and lotions. Clean gently with a soft, dry cloth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;