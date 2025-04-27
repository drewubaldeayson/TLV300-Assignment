import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ContactInfoTable.css';

const ContactInfoTable = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p className="no-data-message">No contact information available</p>;
    }

    return (
        <div className="contact-info-container">
            <div className="contact-info-header">
                <h3>Contact Information</h3>
            </div>
            <div className="contact-info-table-wrapper">
                <table className="contact-info-table">
                    <thead>
                        <tr>
                            <th>Contact Type</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data).map(([key, value]) => (
                            <tr key={key} className="contact-info-row">
                                <td className="contact-info-label">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </td>
                                <td className="contact-info-value">{value || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ContactInfoTable.propTypes = {
    data: PropTypes.object.isRequired
};

export default ContactInfoTable;