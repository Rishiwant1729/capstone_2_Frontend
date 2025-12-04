/**
 * Application Configuration
 * 
 * This file centralizes all environment variables and configuration settings.
 * 
 * To change the API URL:
 * 1. Edit the .env file in the root directory
 * 2. Set VITE_API_URL to your backend URL
 * 
 * For local development: http://localhost:5001/
 * For production: https://your-backend-url.com/
 */

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/";

// Other configuration constants can be added here
export const config = {
  api: {
    baseUrl: API_URL,
    timeout: 30000, // 30 seconds
  },
  auth: {
    tokenKey: "token", // localStorage key for JWT token
  },
  upload: {
    maxFileSize: 15 * 1024 * 1024, // 15MB in bytes
    allowedTypes: ["application/pdf"],
  },
};

export default config;
