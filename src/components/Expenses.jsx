import React, { useState, useEffect } from 'react';
import supabase from '../lib/Supabase';
import Sidebar from './Sidebar'; 
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const ExpensesPage = () => {
  const [expenseData, setExpenseData] = useState({
    id: '', 
    name: '',
    amount: '',
    category: '',
    date: '', 
  });
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Search Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, amount, category, date, id } = expenseData;
  
    if (!name || !amount || !category || !date) {
      setError('All fields are required');
      return;
    }
  
    try {
      if (id) {
        // Update existing expense
        const { data, error } = await supabase
          .from('expenses')
          .update({ name, amount, category, date })
          .eq('id', id); 
        if (error) throw error;
  
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === id
              ? { ...expense, name, amount, category, date }
              : expense
          )
        );
        alert('Expense updated successfully!');
      } else {
        // Insert a new expense
        const { data, error } = await supabase
          .from('expenses')
          .insert([{ name, amount, category, date }]);
  
        if (error) throw error;
  
        // Ensure data is available before accessing it
        if (data && data.length > 0) {
          setExpenses((prevExpenses) => [
            ...prevExpenses,
            { id: data[0].id, name, amount, category, date }, 
          ]);
          alert('Expense added successfully!');
        } else {
          alert('Error adding expense: Data not returned');
        }
      }
  
      setExpenseData({ id: '', name: '', amount: '', category: '', date: '' });
      setIsModalOpen(false); 
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  // Fetch existing expenses with pagination when the component mounts       
    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          const { data, error, count } = await supabase
            .from('expenses')
            .select('*', { count: 'exact' })
            .ilike('name', `%${searchTerm}%`)
            .range((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage - 1);
    
          if (error) throw error; 
          if (data) {
            console.log('Fetched Expenses:', data); 
            setExpenses(data);
            setTotalPages(Math.ceil(count / entriesPerPage)); 
          }
        } catch (err) {
          console.error('Error fetching expenses:', err);
          setError('Failed to fetch expenses');
        }
      };
    
      fetchExpenses();
    }, [searchTerm, currentPage, entriesPerPage]);
    

  const handleEdit = (expense) => {
    // Set the selected expense data into the form for editing
    setExpenseData(expense);
    setIsModalOpen(true); 
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this expense?');
    if (confirmation) {
      try {
        const { error } = await supabase.from('expenses').delete().eq('id', id);

        if (error) throw error;

        // Update the expenses list after deletion
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
        alert('Expense deleted successfully!');
      } catch (err) {
        alert('Error deleting expense: ' + err.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f9fc] font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 ml-80">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">Expense Management</h1>
        </div>

        {/* Button to trigger modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Expense
        </button>

        {/* Expenses Table */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4">Expenses List</h2>

            {/* Search Input - placed to the right of the table */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded-md w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Expense Name</th>
                <th className="px-6 py-3 text-left font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
                {expenses && expenses.length > 0 ? (
                  expenses.map((expense, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200`}
                    >
                      <td className="px-6 py-4 font-medium">{expense.name || 'N/A'}</td>
                      <td className="px-6 py-4 font-medium">${expense.amount || 0}</td>
                      <td className="px-6 py-4 font-medium">{expense.category || 'N/A'}</td>
                      <td className="px-6 py-4 font-medium">{expense.date || 'N/A'}</td>
                      <td className="px-6 py-4 font-medium">
                        <button onClick={() => handleEdit(expense)} className="text-blue-500 mx-2">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(expense.id)} className="text-red-500 mx-2">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No transactions found</td>
                  </tr>
                )}
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

      {/* Modal to Add/Edit Expense */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-1/3 relative">
            <h2 className="text-2xl font-bold mb-4">{expenseData.id ? 'Edit Expense' : 'Add Expense'}</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Expense Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={expenseData.name}
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
                  value={expenseData.amount}
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
                  value={expenseData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              {/* Date Picker for Selecting Date */}
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700">Transaction Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={expenseData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
