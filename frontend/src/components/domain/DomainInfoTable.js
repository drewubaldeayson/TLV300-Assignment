import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/DomainInfoTable.css';

const DomainInfoTable = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p className="no-data-message">No domain information available</p>;
    }

    return (
        <div className="domain-info-container">
            <div className="domain-info-header">
                <h3>Domain Information</h3>
            </div>
            <div className="domain-info-table-wrapper">
                <table className="domain-info-table">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data).map(([key, value]) => (
                            <tr key={key} className="domain-info-row">
                                <td className="domain-info-label">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </td>
                                <td className="domain-info-value">{value || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

DomainInfoTable.propTypes = {
    data: PropTypes.object.isRequired
};

export default DomainInfoTable;