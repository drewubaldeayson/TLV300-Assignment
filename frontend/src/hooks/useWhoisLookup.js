import { useState, useCallback } from 'react';
import { performWhoisLookup } from '../services/whoisService';

const useWhoisLookup = () => {
    const [domain, setDomain] = useState('');
    const [infoType, setInfoType] = useState('domain');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const performLookup = useCallback(async (domainName, infoType) => {
        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const response = await performWhoisLookup(domainName, infoType);
            setResults(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        domain,
        setDomain,
        infoType,
        setInfoType,
        results,
        error,
        loading,
        performLookup
    };
};

export default useWhoisLookup;