const WhoisService = require('../services/whoisService');
const { formatDomainInfo, formatContactInfo } = require('../utils/formatters');
const { validateDomain } = require('../utils/validations');

class WhoisController {
    static async lookup(req, res) {
        try {
            const { domainName, infoType } = req.body;
            // Validate domain
            validateDomain(domainName);

            // Fetch WHOIS data
            const rawWhoisData = await WhoisService.fetchWhoisData(domainName);

            // Format response based on info type
            let formattedData;
            switch (infoType) {
                case 'domain':
                    formattedData = formatDomainInfo(rawWhoisData);
                    break;
                case 'contact':
                    formattedData = formatContactInfo(rawWhoisData);
                    break;
                default:
                    throw new Error('Invalid information type');
            }

            // Directly return formatted data to match frontend expectation
            res.status(200).json(formattedData);
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message
            });
        }
    }
}

module.exports = WhoisController;