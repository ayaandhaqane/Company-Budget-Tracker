import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AppContext'; 
import SignInPage from './pages/SingIn'; 
import SignUpPage from './pages/Singup'; 
import Dashboard from './pages/Dashbord'; 
import Expenses from './components/Expenses'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import RevenueForm from './components/Revanue';
import TransactionsPage from './components/Transactions';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/contact" element={<Contact/>} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Expenses Route */}
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/revenue"
            element={
              <ProtectedRoute>
                <RevenueForm />
              </ProtectedRoute>
            }
          />
           <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
