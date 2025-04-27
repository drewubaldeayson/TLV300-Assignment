const formatters = {
    //To truncate hostnames
    truncateHostnames(hostnames, maxLength = 25) {
        if (!hostnames || hostnames.length === 0) return 'N/A';
        
        const hostnameString = hostnames.join(', ');
        return hostnameString.length > maxLength
            ? `${hostnameString.substring(0, maxLength)}...`
            : hostnameString;
    },
    //To format domain information
    formatDomainInfo(rawData) {
        return {
            domainName: rawData.domainName || 'N/A',
            registrar: rawData.registrarName || 'N/A',
            registrationDate: rawData.registryData?.createdDate || 'N/A',
            expirationDate: rawData.registryData?.expiresDate || 'N/A',
            domainAge: rawData.estimatedDomainAge || 'N/A',
            hostnames: formatters.truncateHostnames(rawData.nameServers?.hostNames || [])
        };
    },
    //To format the contact information
    formatContactInfo(rawData) {
        return {
            registrantName: rawData.registrant?.name || 'N/A',
            technicalContactName: rawData.technicalContact?.name || 'N/A',
            administrativeContactName: rawData.administrativeContact?.name || 'N/A',
            contactEmail: rawData.administrativeContact?.email || 'N/A'
        };
    }
};

module.exports = formatters;