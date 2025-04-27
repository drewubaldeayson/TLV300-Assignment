import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false,
            errorMessage: ''
        };
    }

    /**
     * Catches errors in child components
     * @param {Error} error - The error that was caught
     * @returns {Object} Updated state
     */
    static getDerivedStateFromError(error) {
        return { 
            hasError: true,
            errorMessage: error.message 
        };
    }

    /**
     * Log error information
     * @param {Error} error - The error that was caught
     * @param {Object} errorInfo - Additional error information
     */
    componentDidCatch(error, errorInfo) {
        // Log error to monitoring service
        console.error('Uncaught error:', error, errorInfo);
    }

    /**
     * Render fallback UI when an error occurs
     * @returns {React.ReactNode} Error message or children
     */
    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Something went wrong</h2>
                    <p>{this.state.errorMessage}</p>
                    <button onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;