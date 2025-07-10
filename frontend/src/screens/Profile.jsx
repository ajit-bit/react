import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Profile.module.css'; // Assuming you have a CSS module for styles

const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
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
      navigate('/auth');
    }
  }, [user, navigate]);

  const validators = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    password: (value) => !value || value.length >= 6,
    phone: (value) => /^[+]?\d{10,15}$/.test(value),
    name: (value) => value.trim().length >= 2,
  };

  const validateField = (name, value) => {
    if (!value && name !== 'password' && name !== 'confirmPassword') return 'This field is required';
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
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

    const fields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
    const newErrors = {};
    fields.forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}));

    const hasErrors = Object.values(newErrors).some((msg) => msg);
    if (hasErrors) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password || undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        toast.success('Profile updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        navigate('/');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to update profile', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error('Update profile error:', err);
      toast.error('An error occurred while updating profile', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={`${styles.profileWrapper} container my-5`}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className={`${styles.card} card shadow-sm`}>
            <div className="card-body">
              <h2 className={`${styles.cardTitle} card-title text-center mb-4`}>User Profile</h2>
              <div className="form">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className={`form-control ${styles.formControl} ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-control ${styles.formControl} ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${styles.formControl} ${errors.email && touched.email ? 'is-invalid' : ''}`}
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${styles.formControl} ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && touched.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className={`mb-3 position-relative ${styles.inputPassword}`}>
                  <label htmlFor="password" className="form-label">New Password (Optional)</label>
                  <input
                    type={showPassword.password ? 'text' : 'password'}
                    name="password"
                    className={`form-control ${styles.formControl} ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => togglePasswordVisibility('password')}
                  >
                    👁
                  </span>
                  {errors.password && touched.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className={`mb-3 position-relative ${styles.inputPassword}`}>
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                  <input
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className={`form-control ${styles.formControl} ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    👁
                  </span>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} onClick={handleSubmit}>Update Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;