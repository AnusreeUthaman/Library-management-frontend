import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ReviewAndRating = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [editingReview, setEditingReview] = useState(null);

    const fetchCurrentUser = async () => {
        try {
            const res = await API.get('user/profile/');
            console.log('Full user profile response:', res);
            setUser(res.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            if (!id) {
                setError('Invalid book ID');
                return;
            }
            const res = await API.get(`book/reviews/list/${id}/`);
            setReviews(res.data.data || []);
        } catch (error) {
            setError('Error fetching reviews');
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
        fetchReviews();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingReview) {
                const res = await API.put(`book/update/review/${editingReview.id}/`, {comment,rating,});

                if (res.data.success) {
                    setComment('');
                    setRating(1);
                    setEditingReview(null);
                    fetchReviews();
                }
            } else {
                const res = await API.post(`book/add/review/${id}/`, {comment,rating,});

                if (res.data.success) {
                    setComment('');
                    setRating(1);
                    fetchReviews();
                }
            }
        } catch (error) {
                const message = error.response?.data?.message || "Something went wrong";
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: message,
                });
            console.error('Error submitting review:', error);
        }
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
        setComment(review.comment);
        setRating(review.rating);
    };

    const handleDeleteReview = async (reviewId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this review?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
                try {
                    const res = await API.delete(`book/delete/review/${reviewId}/`);
                    if (res.data.success) {
                        fetchReviews();
                        Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                    }
                } catch (error) {
                    console.error('Error deleting review:', error);
                    Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
                }
            }
        };


    const handleCancelEdit = () => {
        setComment('');
        setRating(1);
        setEditingReview(null);
    };
    const averageRating = reviews.length? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1): null;

    return (
        <section className="ml-10 my-10">
            <h3 className="text-2xl font-semibold italic mb-3">Write a Review</h3>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-sm shadow-sm max-w-6xl">
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <textarea
                    className="w-full border border-gray-300 rounded-md p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="comment"
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows="4"
                ></textarea>
                <div className="flex items-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star}>
                            <input
                                type="radio"
                                id={`star${star}`}
                                name="rating"
                                value={star}
                                checked={rating === star}
                                onChange={() => setRating(star)}
                                className="hidden"
                            />
                            <label
                                htmlFor={`star${star}`}
                                className={`text-2xl cursor-pointer ${
                                    rating >= star ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                            >
                                ★
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        {editingReview ? 'Update Review' : 'Submit Review'}
                    </button>
                    
                    {editingReview && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="mt-10 max-w-5xl">
                <h3 className="text-xl font-semibold mb-4">Top Reviews</h3>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            className="border-b border-gray-200 py-4 flex justify-between items-start "
                        >
                            <div>
                                <div className="flex items-center space-x-1 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold text-sm">
                                    {review.user?.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <p className="font-semibold text-gray-800">{review.user?.username || 'User'}</p>
                                </div>

                                {/* Individual Rating */}
                                <div className="mb-1 text-md font-bold text-yellow-600">
                                    <span className="text-gray-800 mr-2">
                                        {review.rating.toFixed(1)}
                                    </span>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i}>
                                            {i < review.rating ? '★' : '☆'}
                                        </span>
                                    ))}
   
                                </div>

                                <p className="text-gray-700 mt-1">{review.comment}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(review.created_at  ).toLocaleString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                    })}
                                </p>
                            </div>
                            {user && user.id === review.user?.id && (
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEditReview(review)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteReview(review.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ReviewAndRating;
