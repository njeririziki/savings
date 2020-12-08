import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import User from './Pages/User';
import Expense from './Pages/Expense';
import Goal from './Pages/Goals';
import Budget from './Pages/Budget';
import Savings from './Pages/Savings';
import{PrivateRoute,PublicRoute,AdminRoute} from './PrivateRoute'
import Login from './Pages/LogIn'
import Signup from './Pages/Signup'
import AdminPanel from './Pages/AdminPanel'
import {AuthProvider} from './Context/AuthContext';
import PasswordReset from './Pages/PasswordReset'

const Router = () => {
    
    return ( 
       
        <AuthProvider>
             <BrowserRouter>
        <div>
        <PrivateRoute path='/' component={Goal} exact/>
            <PublicRoute path='/logIn' component={Login} exact/>
            <PrivateRoute path='/goals' component={Goal} exact/>
            <PrivateRoute path='/user' component={User} exact/>
            <PrivateRoute path='/expense' component={Expense} exact/>
            <PrivateRoute path='/budget' component={Budget} exact/>
            <PrivateRoute path='/savings' component={Savings} exact/>
            <PublicRoute path='/signup' component={Signup} exact/>
            <PublicRoute path='/passwordreset' component={PasswordReset} exact/>
            <PrivateRoute path='/adminpanel' component={AdminPanel}exact/>
        </div>
        </BrowserRouter>
        </AuthProvider>
       
     );
}
 

export default Router;