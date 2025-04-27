import React from 'react';
import useWhoisLookup from './hooks/useWhoisLookup';
import DomainInfoTable from './components/domain/DomainInfoTable';
import ContactInfoTable from './components/domain/ContactInfoTable';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { validateDomain, sanitizeDomain } from './utils/validation';
import { camelToTitleCase } from './utils/formatting';
import './styles/global.css';

function App() {
    const { 
        domain, 
        setDomain, 
        infoType, 
        setInfoType, 
        results, 
        error, 
        loading, 
        performLookup 
    } = useWhoisLookup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Validate and sanitize domain
            const sanitizedDomain = sanitizeDomain(domain);
            validateDomain(sanitizedDomain);
            
            // Perform lookup
            await performLookup(sanitizedDomain, infoType);
        } catch (validationError) {
            // Error handling is managed in the hook
            console.error(validationError);
        }
    };

    const renderResults = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return <div className="error-message">{error}</div>;
        if (!results) return null;

        return infoType === 'domain' 
            ? <DomainInfoTable data={results} /> 
            : <ContactInfoTable data={results} />;
    };

    return (
        <ErrorBoundary>
            <div className="app-container">
                <div className="whois-lookup-container">
                    <form onSubmit={handleSubmit} className="whois-form">
                        <h1>WHOIS Lookup</h1>
                        
                        <div className="form-group">
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder="Enter domain name (e.g., amazon.com)"
                                required
                                className="domain-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <select 
                                value={infoType} 
                                onChange={(e) => setInfoType(e.target.value)}
                                className="info-type-select"
                            >
                                <option value="domain">Domain Information</option>
                                <option value="contact">Contact Information</option>
                            </select>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="lookup-button"
                        >
                            {loading ? 'Searching...' : 'Lookup'}
                        </button>
                    </form>

                    {renderResults()}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default App;