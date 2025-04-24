import React, { useState, useEffect } from 'react';
import supabase from '../lib/Supabase'; 

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]); 
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [entriesPerPage, setEntriesPerPage] = useState(5); 
  const [totalTransactions, setTotalTransactions] = useState(0);

  // Fetch expenses and revenue from the database
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch expenses
        const { data: expenseData, error: expenseError } = await supabase
          .from('expenses')
          .select('*')
          .ilike('name', `%${searchTerm}%`)
          .range((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage - 1);
        
        if (expenseError) throw expenseError;

        // Fetch revenue
        const { data: revenueData, error: revenueError } = await supabase
          .from('revenue')
          .select('*')
          .ilike('name', `%${searchTerm}%`)
          .range((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage - 1);
        
        if (revenueError) throw revenueError;

        // Add transaction type and transaction-name to each record (expense or revenue)
        const expensesWithType = expenseData.map(item => ({
          ...item,
          transactionType: 'Expense',
          transactionName: item.name,
          transaction_date: item.date,
        }));

        const revenueWithType = revenueData.map(item => ({
          ...item,
          transactionType: 'Revenue',
          transactionName: item.name,
          transaction_date: item.rev_data,
        }));

        // Merge the data (expenses and revenues)
        const allTransactions = [...expensesWithType, ...revenueWithType];

        // Sort by date (descending order)
        allTransactions.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));

        setTransactions(allTransactions);
        setTotalTransactions(allTransactions.length); 
        setTotalPages(Math.ceil(allTransactions.length / entriesPerPage)); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransactions();
  }, [currentPage, searchTerm, entriesPerPage]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset
  };

  // Handle entries per page change
  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value)); 
    setCurrentPage(1); 
  };

  return (
    <div className="flex min-h-screen bg-[#f5f9fc] font-sans">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-6 ml-80">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">Transactions List</h1>

         
        </div>

        {/* Error handling */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

             {/* Transactions Table */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md overflow-auto">
           {/* Search Input */}
           <div className="flex space-x-2 justify-end items-center">
            <input
              type="text"
              placeholder="Search Transactions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded-md w-64"
            />
          </div>
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Transaction Type</th>
                <th className="px-6 py-3 text-left">Transaction Name</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">{transaction.transactionType}</td>
                    <td className="px-6 py-4">{transaction.transactionName}</td>
                    <td className="px-6 py-4">${transaction.amount}</td>
                    <td className="px-6 py-4">{transaction.category}</td>
                    <td className="px-6 py-4">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No transactions found.
                  </td>
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
    </div>
  );
};

export default TransactionsPage;
