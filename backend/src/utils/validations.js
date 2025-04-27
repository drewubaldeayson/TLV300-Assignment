module.exports = {
    //To validate the domain
    validateDomain(domain) {
        if (!domain) {
            throw new Error('Domain is required');
        }

        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/;

        if (!domainRegex.test(domain)) {
            throw new Error('Invalid domain format');
        }

        return true;
    }
};