import React, { useState } from 'react';
import request from '../commonComponent/ApiConnector'; // Import the request utility

const AddTenant = () => {
  const [formData, setFormData] = useState({
    domain: '',
    registrationDate: '',
    contactEmail: '',
    organisation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await request({
        url: 'http://localhost:8080/api/tenants/add', // Replace with your API endpoint
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // console.log('Form submitted successfully:', response);
      alert('Tenant added successfully!');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error submitting the form: ' + (error.message || error));
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '16px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Add Tenant</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Domain:</label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Registration Date:</label>
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Email:</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Organisation:</label>
          <input
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTenant;
