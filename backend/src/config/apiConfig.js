require('dotenv').config();

module.exports = {
    WHOIS_API: {
        BASE_URL: 'https://www.whoisxmlapi.com/whoisserver/WhoisService',
        API_KEY: process.env.WHOIS_API_KEY
    },
    SERVER: {
        PORT: process.env.PORT || 5000
    }
};