const express = require('express');
const cors = require('cors');
const apiConfig = require('./src/config/apiConfig');
const whoisRoutes = require('./src/routes/whoisRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const requestLogger = require('./src/middleware/requestLogger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(requestLogger);
}

// Routes
app.use('/api', whoisRoutes); 

// Error handling
app.use(errorHandler);

const startServer = () => {
    const port = apiConfig.SERVER.PORT;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

module.exports = { app, startServer };

if (require.main === module) {
    startServer();
}