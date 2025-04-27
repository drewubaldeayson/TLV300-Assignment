import axios from 'axios';
import { validateDomain } from '../utils/validation';

export const performWhoisLookup = async (domainName, infoType) => {
    // Validate domain before making the request
    validateDomain(domainName);

    try {
        const response = await axios.post(
            'http://localhost:5000/api/whois-lookup', 
            { domainName, infoType }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.error || 'Failed to perform WHOIS lookup'
        );
    }
};