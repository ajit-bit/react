import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/logo.jpg';
import styles from '../styles/Auth.module.css'; // Updated to import Auth.module.css

const AuthComponent = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false,
    newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const navigate = useNavigate();

  const toggleTab = (login) => {
    setIsLogin(login);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      agreeTerms: false,
      newsletter: false,
    });
    setErrors({});
    setTouched({});
  };

  const validators = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    password: (value) => value.length >= 6,
    phone: (value) => /^[+]?\d{10,15}$/.test(value),
    name: (value) => value.trim().length >= 2,
  };

  const validateField = (name, value) => {
    if (!value) return 'This field is required';
    switch (name) {
      case 'email':
        return validators.email(value) ? '' : 'Invalid email address';
      case 'password':
        return validators.password(value) ? '' : 'Password must be at least 6 characters';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
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
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = isLogin
      ? ['email', 'password']
      : ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];

    const newErrors = {};
    fields.forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });

    if (!isLogin && !formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    setTouched(
      fields.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
    );

    const hasErrors = Object.values(newErrors).some((msg) => msg);
    if (hasErrors) return;

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:5000${url}`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          confirmPassword: undefined,
          rememberMe: undefined,
          agreeTerms: undefined,
          newsletter: undefined,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (onLogin) onLogin(data.token, data.user);
        toast.success(`${isLogin ? 'Login' : 'Signup'} successful!`, {
          className: styles['women-theme-toast'],
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error(data.message || 'Authentication failed', {
          className: styles['women-theme-toast'],
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error('Authentication error:', err);
      let errorMessage = 'An error occurred during authentication';
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your network or server status.';
      }
      toast.error(errorMessage, {
        className: styles['women-theme-toast'],
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login is not implemented yet.`, {
      className: styles['women-theme-toast'],
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className={styles['auth-wrapper']}>
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
        className={styles['women-theme-toast']}
      />
      <div className={styles['auth-container']}>
        <div className={styles['auth-header']}>
          <div className={styles['auth-logo']}>
            <Link to="/">
              <img src={logo} alt="Logo" className={styles['auth-logo-img']} />
            </Link>
          </div>
          <h1 className={styles['auth-title']}>AAISHA HOUSE OF SILVER</h1>
          <p className={styles['auth-subtitle']}>EXCLUSIVE JEWELRY</p>
        </div>

        <div className={styles['auth-tabs']}>
          <button className={`${styles.tab} ${isLogin ? styles.active : ''}`} onClick={() => toggleTab(true)}>
            Login
          </button>
          <button className={`${styles.tab} ${!isLogin ? styles.active : ''}`} onClick={() => toggleTab(false)}>
            Sign Up
          </button>
        </div>

        <form className={styles['auth-form']} onSubmit={handleSubmit}>
          <h2 className={styles['form-heading']}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className={styles['form-subheading']}>
            {isLogin ? 'Sign in to your account' : 'Join our exclusive jewelry collection'}
          </p>

          {!isLogin && (
            <>
              <div className={styles['form-row']}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${errors.firstName && touched.firstName ? styles.error : ''}`}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${errors.lastName && touched.lastName ? styles.error : ''}`}
                />
              </div>
              {errors.firstName && touched.firstName && <span className={styles['error-text']}>{errors.firstName}</span>}
              {errors.lastName && touched.lastName && <span className={styles['error-text']}>{errors.lastName}</span>}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.phone && touched.phone ? styles.error : ''}`}
              />
              {errors.phone && touched.phone && <span className={styles['error-text']}>{errors.phone}</span>}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.email && touched.email ? styles.error : ''}`}
          />
          {errors.email && touched.email && <span className={styles['error-text']}>{errors.email}</span>}

          <div className={styles['input-password']}>
            <input
              type={showPassword.password ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.password && touched.password ? styles.error : ''}`}
            />
            <span className={styles['eye-icon']} onClick={() => togglePasswordVisibility('password')}>
              👁
            </span>
          </div>
          {errors.password && touched.password && <span className={styles['error-text']}>{errors.password}</span>}

          {!isLogin && (
            <div className={styles['input-password']}>
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.confirmPassword && touched.confirmPassword ? styles.error : ''}`}
              />
              <span className={styles['eye-icon']} onClick={() => togglePasswordVisibility('confirmPassword')}>
                👁
              </span>
            </div>
          )}
          {!isLogin && errors.confirmPassword && touched.confirmPassword && (
            <span className={styles['error-text']}>{errors.confirmPassword}</span>
          )}

          {isLogin ? (
            <div className={styles['options-row']}>
              <label className={styles['checkbox-label']}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                Remember me
              </label>
              <a href="#" className={styles['link-yellow']}>Forgot Password?</a>
            </div>
          ) : (
            <>
              <label className={styles['checkbox-label']}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                />
                I agree to the <span className={styles['link-yellow']}>Terms & Conditions</span>
              </label>
              {errors.agreeTerms && <span className={styles['error-text']}>{errors.agreeTerms}</span>}

              <label className={styles['checkbox-label']}>
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                />
                Subscribe to our newsletter for exclusive offers
              </label>
            </>
          )}

          <button type="submit" className={styles['submit-btn']}>
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>

          <div className={styles.divider}><span>or continue with</span></div>

          <div className={styles['social-buttons']}>
            <button type="button" className={styles['social-btn']} onClick={() => handleSocialLogin('Google')}>
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" /> Google
            </button>
            <button type="button" className={styles['social-btn']} onClick={() => handleSocialLogin('Facebook')}>
              <img src="https://img.icons8.com/fluency/24/000000/facebook-new.png" alt="Facebook" /> Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;