import React from 'react';

const BookConditionSelector = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-1"
    >
      <option value="available">Available</option>
      <option value="damaged">Damaged</option>
      <option value="under_maintenance">Under Maintenance</option>
      <option value="lost">Lost</option>
    </select>
  );
};

export default BookConditionSelector;
