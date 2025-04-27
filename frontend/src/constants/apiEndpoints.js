/**
 * API Endpoint Constants
 * Centralized configuration for API endpoints
 */
export const API_ENDPOINTS = {
    // Base URL for API
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',

    // WHOIS related endpoints
    WHOIS: {
        LOOKUP: '/whois/lookup',
        VALIDATE: '/whois/validate'
    }
};

/**
 * HTTP Method Constants
 */
export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};