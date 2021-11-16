import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import React, {createContext, useContext } from 'react';
import Login from './components/LoginComponent';
import Home from './components/HomeComponent';
import Dashboard from './components/dashboard/DashboardComponent';
import Category from './components/dashboard/CategoryComponent';
import Product from './components/dashboard/ProductComponent';
import User from './components/dashboard/UserComponent';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/categories" element={<Category />} />
        <Route path="/dashboard/products" element={<Product />} />
        <Route path="/dashboard/users" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
