const axios = require('axios');
const apiConfig = require('../config/apiConfig');

class WhoisService {
    //Call WHOIS API and return the data
    static async fetchWhoisData(domainName) {
        try {
            const response = await axios.get(apiConfig.WHOIS_API.BASE_URL, {
                params: {
                    apiKey: apiConfig.WHOIS_API.API_KEY,
                    domainName,
                    outputFormat: 'JSON'
                }
            });

            return response.data.WhoisRecord || {};
        } catch (error) {
            throw new Error(`WHOIS lookup failed: ${error.message}`);
        }
    }
}

module.exports = WhoisService;