import { createContext, useState, useEffect, useContext, useReducer } from 'react';
import supabase from '../lib/Supabase';

// Initial state
const initialState = {
  totalRevenue: 0,
  last5YearsRevenue: {
    years: [],
    revenue: [],
  },
};

// Reducer function for app-related states (e.g., totalRevenue, lastMonthsRevenue)
export const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOTAL_REVENUE':
      return { ...state, totalRevenue: action.payload };
    case 'SET_LAST_MONTHS_REVENUE':
      return { ...state, last5YearsRevenue: action.payload };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(appReducer, initialState); 

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession(); 
      if (error) {
        console.error('Error fetching session:', error.message);
      }
      setSession(session); 
      setLoading(false);
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
