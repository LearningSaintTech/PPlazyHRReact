import React, { useEffect, useState } from 'react';
import request from '../commonComponent/ApiConnector'; // Importing the request utility
import { API_BASE_URL } from '../commonComponent/Constant';
const AllTenant = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await request({
          url: `${API_BASE_URL}/api/tenants/all`,
          method: 'GET',
        });

        setTenants(response.data); // Assuming the data is in the `data` field
      } catch (err) {
        setError(err.reason || 'Failed to fetch tenants.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Tenants</h1>
      {tenants.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Domain</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Registration Date</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Contact Email</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Organisation</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{tenant.id}</td>
                <td style={{ padding: '8px' }}>{tenant.domain}</td>
                <td style={{ padding: '8px' }}>{tenant.registrationDate}</td>
                <td style={{ padding: '8px' }}>{tenant.contactEmail}</td>
                <td style={{ padding: '8px' }}>{tenant.organisation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No tenants found.</div>
      )}
    </div>
  );
};

export default AllTenant;
