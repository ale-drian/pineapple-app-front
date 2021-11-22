import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Navigate,
  Link
} from 'react-router-dom';
import React, {createContext, useContext, useEffect, useReducer, useState } from 'react';
import Login from './components/LoginComponent';
import Home from './components/HomeComponent';
import Dashboard from './components/dashboard/DashboardComponent';
import Category from './components/dashboard/CategoryComponent';
import Product from './components/dashboard/ProductComponent';
import User from './components/dashboard/UserComponent';
import Layout from './components/layout/dashboard/LayoutComponent';
import { authReducer } from './auth/authReducer';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const init = () => JSON.parse(localStorage.getItem('user')) || { logged:false }

function App() {
  
  const [user, dispatch] = useReducer(authReducer,{},init)
  const [login, setlogin] = useState(false);

  useEffect(()=>{
      localStorage.setItem( 'user', JSON.stringify(user))
  },[user])

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
            { user.logged ?
              <Route path="/dashboard" element={<Layout/>}>
                  <Route path="/dashboard/" element={<Dashboard />} />
                  <Route path="/dashboard/products" element={<Product />} />
                  <Route path="/dashboard/users" element={<User />} />
                  <Route path="/dashboard/*" element={<Navigate to ="/login" />}/>
              </Route>
              :
              <Route path="/login" element={<Login/>} />
            }
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}


export default App;