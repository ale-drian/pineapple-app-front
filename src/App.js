import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import React, {createContext, useContext } from 'react';
import Login from './components/LoginComponent';
import Home from './components/HomeComponent';
import Dashboard from './components/dashboard/DashboardComponent';
import Category from './components/dashboard/CategoryComponent';
import Product from './components/dashboard/ProductComponent';
import User from './components/dashboard/UserComponent';
import Layout from './components/layout/dashboard/LayoutComponent';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/dashboard",
    component: Layout,
    routes: [
      {
        path: "/dashboard/products",
        component: Product
      },
      {
        path: "/dashboard/users",
        component: User
      }
    ]
  }
];


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Layout/>}>
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<Product />} />
            <Route path="/dashboard/users" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;