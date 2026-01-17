import React, { useState, useEffect } from 'react';
import { adminHireAPI } from '../../utils/api';

const HireRequestManager = () => {
  const [hireRequests, setHireRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHireRequests();
  }, []);

  const fetchHireRequests = async () => {
    try {
      setLoading(true);
      const response = await adminHireAPI.getAll();
      setHireRequests(response.data);
    } catch (err) {
      setError('Failed to fetch hire requests');
      console.error('Error fetching hire requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hire request?')) {
      try {
        await adminHireAPI.delete(id);
        setHireRequests(hireRequests.filter(request => request._id !== id));
      } catch (err) {
        setError('Failed to delete hire request');
        console.error('Error deleting hire request:', err);
      }
    }
  };

  if (loading) return <div className="text-center py-4">Loading hire requests...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Hire Requests</h2>
      {hireRequests.length === 0 ? (
        <p className="text-gray-500">No hire requests yet.</p>
      ) : (
        <div className="space-y-4">
          {hireRequests.map((request) => (
            <div key={request._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{request.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{request.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <p className="font-medium">Project Type: {request.projectType}</p>
                    <p className="font-medium">Budget: {request.budget}</p>
                    <p className="font-medium">Timeline: {request.timeline}</p>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{request.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(request._id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HireRequestManager;