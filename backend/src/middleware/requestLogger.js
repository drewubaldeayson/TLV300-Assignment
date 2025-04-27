//For Logging
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url, body } = req;

    console.log(`
        [${timestamp}] ${method} ${url}
        Body: ${JSON.stringify(body)}
    `);

    next();
};

module.exports = requestLogger;