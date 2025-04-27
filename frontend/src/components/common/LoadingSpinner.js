import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading Spinner Component
 * Displays a loading indicator
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>{message}</p>
        </div>
    );
};

LoadingSpinner.propTypes = {
    message: PropTypes.string
};

export default LoadingSpinner;