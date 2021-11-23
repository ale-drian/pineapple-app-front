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
          <Route exact path="/" element={<Home/>} />
            { user.logged ?
              <Route path="/dashboard" element={<Layout/>}>
                  <Route exact  path="/dashboard/" element={<Dashboard />} />

                  <Route exact  path="/dashboard/products" element={<Product />} />
                  {
                    user.role.id == 1 ?
                    <Route exact  path="/dashboard/users" element={<User />} />
                    :
                    ""
                  }
              </Route>
              :
              <Route exact  path="/login" element={<Login/>} />
            }
            { user.logged ? 
              <Route path="/*" element={<Navigate to ="/dashboard" />}/>
            :
              <Route path="/*" element={<Navigate to ="/login" />}/>
            }
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}


export default App;