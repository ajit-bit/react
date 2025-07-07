import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/logo.jpg';
import '../styles/Auth.css';

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
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error(data.message || 'Authentication failed', {
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
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login is not implemented yet.`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <Link to="/">
              <img src={logo} alt="Logo" className="auth-logo-img" />
            </Link>
          </div>
          <h1 className="auth-title">AAISHA HOUSE OF SILVER</h1>
          <p className="auth-subtitle">EXCLUSIVE JEWELRY</p>
        </div>

        <div className="auth-tabs">
          <button className={`tab ${isLogin ? 'active' : ''}`} onClick={() => toggleTab(true)}>
            Login
          </button>
          <button className={`tab ${!isLogin ? 'active' : ''}`} onClick={() => toggleTab(false)}>
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="form-heading">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="form-subheading">
            {isLogin ? 'Sign in to your account' : 'Join our exclusive jewelry collection'}
          </p>

          {!isLogin && (
            <>
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.firstName && touched.firstName ? 'input error' : 'input'}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.lastName && touched.lastName ? 'input error' : 'input'}
                />
              </div>
              {errors.firstName && touched.firstName && <span className="error-text">{errors.firstName}</span>}
              {errors.lastName && touched.lastName && <span className="error-text">{errors.lastName}</span>}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.phone && touched.phone ? 'input error' : 'input'}
              />
              {errors.phone && touched.phone && <span className="error-text">{errors.phone}</span>}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? 'input error' : 'input'}
          />
          {errors.email && touched.email && <span className="error-text">{errors.email}</span>}

          <div className="input-password">
            <input
              type={showPassword.password ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? 'input error' : 'input'}
            />
            <span className="eye-icon" onClick={() => togglePasswordVisibility('password')}>
              👁
            </span>
          </div>
          {errors.password && touched.password && <span className="error-text">{errors.password}</span>}

          {!isLogin && (
            <div className="input-password">
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.confirmPassword && touched.confirmPassword ? 'input error' : 'input'}
              />
              <span className="eye-icon" onClick={() => togglePasswordVisibility('confirmPassword')}>
                👁
              </span>
            </div>
          )}
          {!isLogin && errors.confirmPassword && touched.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}

          {isLogin ? (
            <div className="options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                Remember me
              </label>
              <a href="#" className="link-yellow">Forgot Password?</a>
            </div>
          ) : (
            <>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                />
                I agree to the <span className="link-yellow">Terms & Conditions</span>
              </label>
              {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}

              <label className="checkbox-label">
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

          <button type="submit" className="submit-btn">
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>

          <div className="divider"><span>or continue with</span></div>

          <div className="social-buttons">
            <button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')}>
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" /> Google
            </button>
            <button type="button" className="social-btn" onClick={() => handleSocialLogin('Facebook')}>
              <img src="https://img.icons8.com/fluency/24/000000/facebook-new.png" alt="Facebook" /> Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;