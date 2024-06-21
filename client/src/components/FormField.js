import React from 'react';

const FormField = ({ label, type = "text", name, value, onChange }) => (
  <div className="form-group">
    <label>{label}:</label>
    <input type={type} name={name} value={value} onChange={onChange} />
  </div>
);

export default FormField;