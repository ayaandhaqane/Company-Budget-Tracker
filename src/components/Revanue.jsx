import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import supabase from '../lib/Supabase';
import Sidebar from './Sidebar'; 

const RevenuePage = () => {
  const [revenue, setRevenue] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });
  const [error, setError] = useState(null);
  const [revenues, setRevenues] = useState([]); 
  const [editing, setEditing] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [entriesPerPage, setEntriesPerPage] = useState(5); 

  // Fetch revenues based on the current page
  const fetchRevenues = async () => {
    try {
      const { data, error, count } = await supabase
        .from('revenue')
        .select('*', { count: 'exact' })
        .ilike('name', `%${searchTerm}%`) 
        .range((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage - 1); 

      if (error) {
        console.error(error);
      } else {
        setRevenues(data);
        setTotalPages(Math.ceil(count / entriesPerPage)); 
      }
    } catch (err) {
      console.error('Error fetching revenues:', err.message);
    }
  };

  // Fetching revenues when the component mounts or the page changes
  useEffect(() => {
    fetchRevenues();
  }, [currentPage, searchTerm, entriesPerPage]);

  // Handle Search Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRevenue((prevRevenue) => ({
      ...prevRevenue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, amount, category, date } = revenue;

    if (!name || !amount || !category || !date) {
      setError('All fields are required');
      return;
    }

    try {
      if (editing) {
        // Edit an existing revenue
        const { data, error } = await supabase
          .from('revenue')
          .update({ name, amount: parseFloat(amount), category, rev_data: date })
          .eq('id', revenue.id); 

        if (error) throw error;
        alert('Revenue updated successfully!');
      } else {
        // Insert new revenue
        const { data, error } = await supabase
          .from('revenue')
          .insert([{
            name,
            amount: parseFloat(amount),
            category,
            rev_data: date, 
            created_at: new Date().toISOString(), 
          }]);

        if (error) throw error;
        alert('Revenue added successfully!');
      }

      setRevenue({ name: '', amount: '', category: '', date: '' });
      setShowModal(false); 

      fetchRevenues(); 
      setEditing(false); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (revenueData) => {
    setRevenue(revenueData);
    setEditing(true);
    setShowModal(true); 
  };

  const handleDelete = async (id) => {
    try {
      const { data, error } = await supabase
        .from('revenue')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove deleted revenue from local state
      setRevenues((prevRevenues) => prevRevenues.filter((item) => item.id !== id));

      alert('Revenue deleted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f9fc] font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-80">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">Revenue Management</h1>
        </div>
        <button
          onClick={() => setShowModal(true)} 
          className="bg-blue-900 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Revenue
        </button>

        {/* Revenue Table */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4">Revenue List</h2>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded-md w-1/4"
            />
          </div>
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {revenues.map((revenue, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{revenue.name}</td>
                  <td className="px-6 py-4">${revenue.amount}</td>
                  <td className="px-6 py-4">{revenue.category}</td>
                  <td className="px-6 py-4">{revenue.rev_data}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    {/* Edit and Delete icons */}
                    <button
                      onClick={() => handleEdit(revenue)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="inline-block" />
                    </button>
                    <button
                      onClick={() => handleDelete(revenue.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="text-gray-600 bg-gray-200 p-2 rounded-lg"
          >
            Previous
          </button>
          <span className="text-gray-600 mx-4">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="text-gray-600 bg-gray-200 p-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal to Add/Edit Revenue */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-1/3 relative">
            <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Revenue' : 'Add Revenue'}</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={revenue.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={revenue.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={revenue.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={revenue.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  {editing ? 'Update Revenue' : 'Add Revenue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenuePage;
