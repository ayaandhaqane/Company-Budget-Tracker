# Budget Tracker

A simple yet powerful budget tracker application that allows company to manage their revenue and expenses efficiently. The application offers features like tracking transactions, viewing statistics, and visualizing financial data with charts.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Track and manage revenue and expenses.
- View the total revenue, total expenses, and net income.
- Visualize revenue vs. expenses using donut charts.
- Display revenue by month using bar charts.
- View the latest transactions with pagination and search functionality.
- User-friendly interface built with React and TailwindCSS.

## Technologies
This project is built using the following technologies:
- **Frontend**: React, TailwindCSS, Chart.js
- **Backend**: Supabase (Database as a Service)
- **Charting Library**: Chart.js (for visualizing data)
- **State Management**: React's `useState` and `useEffect` hooks
- **Deployment**: You can deploy this app using services like Netlify, Vercel, or Heroku.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/budget-tracker.git
   
## Set up Supabase:

  1. Go to Supabase and create a new project.

  2. Create two tables: expenses and revenue in your Supabase database.

  3. Insert sample data into both tables to start using the application.

  4. Create a .env file in the root directory of your project and add your Supabase credentials:
     -  REACT_APP_SUPABASE_URL=your-supabase-url
     -  REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
