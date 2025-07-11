// src/components/Profile.jsx

import 'bootstrap/dist/css/bootstrap.min.css';
import { Eye, EyeOff, LogOut, ShoppingBag, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Profile.module.css';

// ... (No changes to the component's state or logic)
const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({ /* ... */ });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState({ /* ... */ });
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
        confirmPassword: '',
      });
    } else {
      toast.info("Please log in to view your profile.", { className: styles.toastInfo });
      navigate('/auth');
    }
  }, [user, navigate]);

  const validators = {
    email: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    password: (value) => !value || value.length >= 6,
    phone: (value) => !value || /^[+]?\d{10,15}$/.test(value),
    name: (value) => !value || value.trim().length >= 2,
  };

  const validateField = (name, value) => {
    if (!value && name !== 'password' && name !== 'confirmPassword') return 'This field is required';
    switch (name) {
      case 'email':
        return validators.email(value) ? '' : 'Invalid email address';
      case 'password':
        return value && !validators.password(value) ? 'Password must be at least 6 characters' : '';
      case 'confirmPassword':
        return !formData.password || value === formData.password ? '' : 'Passwords do not match';
      case 'firstName':
      case 'lastName':
        return validators.name(value) ? '' : 'Name must be at least 2 characters';
      case 'phone':
        return validators.phone(value) ? '' : 'Enter a valid phone number';
      default:
        return '';
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success("You have been logged out.", { className: styles.toastSuccess });
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    if (formData.password) {
      fieldsToValidate.push('password', 'confirmPassword');
    }
    const newErrors = {};
    fieldsToValidate.forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });
    setErrors(newErrors);
    setTouched(fieldsToValidate.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}));
    const hasErrors = Object.values(newErrors).some((msg) => msg);
    if (hasErrors) {
      toast.warn("Please fix the errors before submitting.", { className: styles.toastWarning });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };
      if (formData.password) {
        payload.password = formData.password;
      }

      const response = await fetch('http://localhost:5000/api/auth/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        toast.success('Profile updated successfully!', { className: styles.toastSuccess });
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to update profile', { className: styles.toastError });
      }
    } catch (err) {
      console.error('Update profile error:', err);
      toast.error('An error occurred while updating profile', { className: styles.toastError });
    }
  };


  const renderContent = () => {
    if (activeTab === 'profile') {
      return (
        <form onSubmit={handleSubmit} noValidate>
          <h3 className={styles.contentTitle}>Personal Information</h3>
          {/* REPLACED Bootstrap grid with custom flexbox layout */}
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input id="firstName" type="text" name="firstName" className={`form-control ${styles.formControl} ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`} value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} />
              {touched.firstName && errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input id="lastName" type="text" name="lastName" className={`form-control ${styles.formControl} ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`} value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} />
              {touched.lastName && errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input id="email" type="email" name="email" className={`form-control ${styles.formControl} ${touched.email && errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleInputChange} onBlur={handleBlur} />
              {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input id="phone" type="tel" name="phone" className={`form-control ${styles.formControl} ${touched.phone && errors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} />
              {touched.phone && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
          </div>

          <hr className={styles.divider} />

          <h3 className={styles.contentTitle}>Change Password</h3>
          <p className={styles.sectionSubtitle}>Leave blank if you don't want to change it.</p>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="password" className="form-label">New Password</label>
              <div className={styles.inputGroup}>
                <input id="password" name="password" type={showPassword.password ? 'text' : 'password'} className={`form-control ${styles.formControl} ${touched.password && errors.password ? 'is-invalid' : ''}`} value={formData.password} onChange={handleInputChange} onBlur={handleBlur} />
                <span className={styles.eyeIcon} onClick={() => togglePasswordVisibility('password')}>{showPassword.password ? <EyeOff size={18} /> : <Eye size={18} />}</span>
              </div>
              {touched.password && errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <div className={styles.inputGroup}>
                <input id="confirmPassword" name="confirmPassword" type={showPassword.confirmPassword ? 'text' : 'password'} className={`form-control ${styles.formControl} ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`} value={formData.confirmPassword} onChange={handleInputChange} onBlur={handleBlur} />
                <span className={styles.eyeIcon} onClick={() => togglePasswordVisibility('confirmPassword')}>{showPassword.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</span>
              </div>
              {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
            </div>
          </div>
          <div className="text-end mt-4">
            <button type="submit" className={styles.submitBtn}>Save Changes</button>
          </div>
        </form>
      );
    }
    // ... (rest of the component is the same)
    if (activeTab === 'orders') {
      return (
        <div>
          <h3 className={styles.contentTitle}>Order History</h3>
          <div className={styles.emptyState}>
            <ShoppingBag size={48} strokeWidth={1.5} />
            <p>You have no past orders.</p>
          </div>
        </div>
      );
    }
  };
  return (
    <div className={styles.profileWrapper}>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
      <div className="container">
        <h1 className={styles.pageTitle}>My Account</h1>
        <div className={styles.layoutGrid}>
          <div className={styles.navPanel}>
            <button
              className={`${styles.navLink} ${activeTab === 'profile' ? styles.navLinkActive : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              <span>Profile Details</span>
            </button>
            <button
              className={`${styles.navLink} ${activeTab === 'orders' ? styles.navLinkActive : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={20} />
              <span>Order History</span>
            </button>
            <button className={styles.navLink} onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
          <div className={styles.contentPanel}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;