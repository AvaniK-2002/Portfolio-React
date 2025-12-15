// Email service using EmailJS for sending contact form emails
import emailjs from '@emailjs/browser';

// EmailJS configuration using environment variables
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

// Check if EmailJS is properly configured
const isConfigured = () => {
  return (
    EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
    EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID &&
    EMAILJS_CONFIG.PUBLIC_KEY
  );
};

// Initialize EmailJS if configured
if (isConfigured()) {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

/**
 * Send email using EmailJS
 * @param {Object} formData - The form data to send
 * @param {string} formData.name - Sender's name
 * @param {string} formData.email - Sender's email
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} - Response from EmailJS
 */
export const sendEmail = async (formData) => {
  try {
    // Check if EmailJS is configured
    if (!isConfigured()) {
      throw new Error('EmailJS is not configured. Please set up your environment variables. See EMAILJS_SETUP.md for instructions.');
    }

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('All fields are required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Prepare email template parameters
    const templateParams = {
      from_name: formData.name.trim(),
      from_email: formData.email.trim(),
      message: formData.message.trim(),
      to_name: 'Avani Kulkarni', // Your name
      reply_to: formData.email,
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      message: 'Email sent successfully! Thank you for your message.',
      data: response,
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Provide specific error messages
    let errorMessage = 'Failed to send email. Please try again.';
    
    if (error.text) {
      switch (error.text) {
        case 'Invalid template ID':
          errorMessage = 'Email service configuration error. Please contact the site administrator.';
          break;
        case 'Invalid service ID':
          errorMessage = 'Email service not available. Please try again later.';
          break;
        case 'Unauthorized':
          errorMessage = 'Email service authentication failed. Please contact the site administrator.';
          break;
        default:
          errorMessage = error.text;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error: error,
    };
  }
};

/**
 * Check if EmailJS is properly configured
 * @returns {boolean} - True if configured, false otherwise
 */
export const isEmailConfigured = () => {
  return isConfigured();
};

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result
 */
export const validateFormData = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  if (formData.message && formData.message.trim().length > 1000) {
    errors.message = 'Message must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  sendEmail,
  validateEmail,
  validateFormData,
  isEmailConfigured,
};