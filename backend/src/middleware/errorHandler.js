//For error handling
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`, err.stack);

    const status = err.status || 500;
    const message = err.isOperational 
        ? err.message 
        : 'An unexpected error occurred';

    res.status(status).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};

module.exports = errorHandler;