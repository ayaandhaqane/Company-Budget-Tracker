import React, { useState, useEffect } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp, FaChartLine, FaClipboardList } from 'react-icons/fa6';
import Sidebar from '../components/Sidebar'; 
import supabase from '../lib/Supabase'; 
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart elements and datalabel plugin
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState({ months: [], revenue: [] });
  const [transactions, setTransactions] = useState([]);
  const [dailyTransactions, setDailyTransactions] = useState(0); 

  // Fetching total revenue data
  const fetchTotalRevenue = async () => {
    const { data, error } = await supabase.from('revenue').select('amount');
    if (error) {
      console.error(error);
    } else {
      const totalRevenueAmount = data.reduce((acc, item) => acc + item.amount, 0);
      setTotalRevenue(totalRevenueAmount); 
    }
  };

  // Fetching total expenses data
  const fetchTotalExpenses = async () => {
    const { data, error } = await supabase.from('expenses').select('amount');
    if (error) {
      console.error(error);
    } else {
      const totalExpenseAmount = data.reduce((acc, item) => acc + item.amount, 0);
      setTotalExpenses(totalExpenseAmount); 
    }
  };

  // // Fetching revenue data by month
  const fetchRevenueByMonth = async () => {
    const { data, error } = await supabase
      .from('revenue')
      .select('amount, rev_data'); 
  
    if (error) {
      console.error(error);
      return;
    }
  
    if (data && data.length > 0) {
      const months = [];
      const revenue = [];
  
      data.forEach((item) => {
        const month = new Date(item.rev_data).toLocaleString('default', { month: 'long' }); 
        const index = months.indexOf(month);
        if (index === -1) {
          months.push(month);
          revenue.push(item.amount);
        } else {
          revenue[index] += item.amount;
        }
      });
  
      setMonthlyRevenue({ months, revenue });
    } else {
      console.log('No revenue data found.');
    }
  };
  

  // Fetching today's transactions (revenue and expenses) count
  const fetchDailyTransactions = async () => {
    const today = new Date().toISOString().split('T')[0]; 

    try {
      const { data: revenueData, error: revenueError } = await supabase
        .from('revenue')
        .select('*')
        .eq('transaction_date', today);

      if (revenueError) {
        console.error('Error fetching revenue data:', revenueError);
      }

      const { data: expenseData, error: expenseError } = await supabase
        .from('expenses')
        .select('*')
        .eq('date', today);

      if (expenseError) {
        console.error('Error fetching expense data:', expenseError);
      }

      const totalDailyTransactions = (revenueData ? revenueData.length : 0) + (expenseData ? expenseData.length : 0);
      setDailyTransactions(totalDailyTransactions);
    } catch (err) {
      console.error('Error fetching daily transactions:', err.message);
    }
  };

  // Fetching latest transactions
  const fetchTransactions = async () => {
    try {
      // Fetching the most recent revenue transactions
      const { data: revenueData, error: revenueError } = await supabase
        .from('revenue')
        .select('name, amount, category, rev_data') 
        .order('rev_data', { ascending: false }) 
        .limit(3); 

      if (revenueError) {
        console.error("Error fetching revenue transactions:", revenueError);
      }

      // Fetching the most recent expense transactions
      const { data: expenseData, error: expenseError } = await supabase
        .from('expenses')
        .select('name, amount, category, date') 
        .order('date', { ascending: false }) 
        .limit(2); 

      if (expenseError) {
        console.error("Error fetching expense transactions:", expenseError);
      }

      // Merging revenue and expense data
      const allTransactions = [
        ...revenueData.map(item => ({
          ...item,
          transactionType: 'Revenue',
          transaction_name: item.name, 
          transaction_date: item.rev_data, 
        })),
        ...expenseData.map(item => ({
          ...item,
          transactionType: 'Expense',
          transaction_name: item.name, 
          transaction_date: item.date, 
        })),
      ];

      // Sort merged data by transaction date (most recent first)
      allTransactions.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));

      // Set the merged and sorted transactions to the state
      setTransactions(allTransactions);
    } catch (err) {
      console.error("Error fetching transactions:", err.message);
    }
};



  // Call all fetch functions inside useEffect
  useEffect(() => {
    fetchTotalRevenue();
    fetchTotalExpenses();
    fetchRevenueByMonth();
    fetchDailyTransactions();
    fetchTransactions();
  }, []);

  // Calculate Net Income
  const netIncome = totalRevenue - totalExpenses;

  // Donut Chart Data (Revenue and Expenses)
  const earningsData = {
    labels: ['Total Revenue', 'Total Expenses'],
    datasets: [
      {
        data: [totalRevenue, totalExpenses],
        backgroundColor: ['#3B82F6', '#EF4444'], 
        borderWidth: 4,
        cutout: '55%',
      },
    ],
  };;

  // Bar Chart Data (Revenue by Month)
  const revenueData = {
    labels: monthlyRevenue.months || [],
    datasets: [
      {
        label: 'Revenue by Month',
        data: monthlyRevenue.revenue || [],
        backgroundColor: '#4F46E5', 
        borderRadius: 6,
        borderColor: '#3730A3',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw}%`; 
          },
        },
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const total = totalRevenue + totalExpenses;
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: 'black', 
        font: {
          weight: 'bold',
          size: 16,
        },
      },
    },
  };
  

  return (
    <div className="flex min-h-screen bg-[#f5f9fc] font-sans">
      {/* Sidebar */}
      <Sidebar />

      <div className="ml-80 p-6 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white shadow-md" />
            <img src="https://i.pravatar.cc/150?img=3" alt="Profile" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Income Card */}
            <div className="bg-[#dbf0f6] p-4 rounded-xl">
              <FaArrowTrendUp className="text-green-600 text-xl" />
              <div className="text-gray-500 text-sm">Income</div>
              <div className="text-2xl font-bold">${totalRevenue}</div>
            </div>

            {/* Expenses Card */}
            <div className="bg-[#e6ecf4] p-4 rounded-xl">
              <FaArrowTrendDown className="text-red-600 text-xl" />
              <div className="text-gray-500 text-sm">Expenses</div>
              <div className="text-2xl font-bold">${totalExpenses}</div>
            </div>

            <div className="bg-[#dbf0f6] p-4 rounded-xl">
              <FaClipboardList className="text-green-600 text-xl" />
              <div className="text-gray-500 text-sm">Daily Transactions</div>
              <div className="text-2xl font-bold">{dailyTransactions}</div>
            </div>

            {/* Net Income Card */}
            <div className="bg-[#dbf0f6] p-4 rounded-xl">
              <FaChartLine className="text-blue-600 text-xl" />
              <div className="text-gray-500 text-sm">Net Income</div>
              <div className="text-2xl font-bold">${netIncome}</div>
            </div>
          </div>

          {/* Earnings Donut Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-md font-semibold">Financial Overview</h2>
            </div>

            <div className="flex justify-center items-center h-64 w-100 mx-auto">
              <Doughnut data={earningsData}  options={chartOptions} />
            </div>

            {/* Add legend with color explanations */}
            <div className="mt-4 text-center text-gray-600">
              <div className="flex justify-center items-center space-x-4">
                <div className="flex items-center">
                  <span className="block w-2 h-2 bg-blue-600 mr-2"></span>
                  <span>Total Revenue</span>
                </div>
                <div className="flex items-center">
                  <span className="block w-2 h-2 bg-red-600 mr-2"></span>
                  <span>Total Expenses</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue and Transactions - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Transactions Table */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Last Transactions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="px-6 py-3 text-left">Transaction Type</th>
                    <th className="px-6 py-3 text-left">Transaction Name</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  {transactions.length > 0 ? (
                    transactions.map((txn, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{txn.transactionType}</td>
                        <td className="px-6 py-4">{txn.transaction_name}</td>
                        <td className="px-6 py-4">${txn.amount}</td>
                        <td className="px-6 py-4">{new Date(txn.transaction_date).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No transactions available</td>
                    </tr>
                  )}
               </tbody>

          </table>
        </div>
      </div>


          {/* Revenue by Month Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Revenue by Month</h2>
            <div className="h-80 w-full">
              <Bar data={revenueData} options={chartOptions} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
