import React, { useState } from 'react';
import API from '../../API/AxiosInstance';
import Swal from 'sweetalert2';
import BookConditionSelector from './BookConditionSelector';

const UpdateBookCondition = ({ bookId }) => {
  const [condition, setCondition] = useState('available');

  const updateCondition = async () => {
    const result = await Swal.fire({
      title: 'Update Book Condition',
      text: 'Are you sure you want to update the condition of this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await API.patch(`update/condition/${bookId}/`, { condition });
      Swal.fire('Updated', res.data.message, 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update condition.', 'error');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <BookConditionSelector value={condition} onChange={setCondition} />
      <button
        onClick={updateCondition}
        className="bg-purple-600 px-3 py-1 text-white rounded"
      >
        Update Condition
      </button>
    </div>
  );
};

export default UpdateBookCondition;
