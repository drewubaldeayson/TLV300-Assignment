import React from 'react';
import useWhoisLookup from './hooks/useWhoisLookup';
import DomainInfoTable from './components/domain/DomainInfoTable';
import ContactInfoTable from './components/domain/ContactInfoTable';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { validateDomain, sanitizeDomain } from './utils/validation';
import './App.css';

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
            const sanitizedDomain = sanitizeDomain(domain);
            validateDomain(sanitizedDomain);
            
            await performLookup(sanitizedDomain, infoType);
        } catch (validationError) {
            console.error(validationError);
        }
    };

    const renderResults = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return <div className="error-banner">{error}</div>;
        if (!results) return null;

        return (
            <div className="results-container">
                {infoType === 'domain' 
                    ? <DomainInfoTable data={results} /> 
                    : <ContactInfoTable data={results} />}
            </div>
        );
    };

    return (
        <ErrorBoundary>
            <div className="app-wrapper">
                <div className="whois-lookup-panel">
                    <div className="panel-header">
                        <h1>WHOIS Lookup</h1>
                        <p>Discover detailed information about any domain</p>
                    </div>

                    <form onSubmit={handleSubmit} className="lookup-form">
                        <div className="input-group">
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder="Enter domain name (e.g., amazon.com)"
                                required
                                className="domain-input"
                            />
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
                            {loading ? 'Searching...' : 'Lookup Domain'}
                            <span className="button-icon">🔍</span>
                        </button>
                    </form>

                    {renderResults()}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default App;