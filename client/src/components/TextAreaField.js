import React from 'react';

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="form-group">
    <h2>{label}</h2>
    <textarea name={name} value={value} onChange={onChange} />
  </div>
);

export default TextAreaField;