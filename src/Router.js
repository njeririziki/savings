import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom';
import User from './Pages/User';
import Expense from './Pages/Expense';
import Goal from './Pages/Goals';
import Budget from './Pages/Budget';
import{PrivateRoute,PublicRoute} from './PrivateRoute'
import Login from './Pages/LogIn'
import Signup from './Pages/Signup'
import {AuthProvider} from './Context/AuthContext';

const Router = () => {
    
    return ( 
        <AuthProvider>
             <BrowserRouter>
        <div>
            <PublicRoute path='/' component={Login} exact/>
            <PrivateRoute path='/goals' component={Goal} exact/>
            <PrivateRoute path='/user' component={User} exact/>
            <PrivateRoute path='/expense' component={Expense} exact/>
            <PrivateRoute path='/budget' component={Budget} exact/>
            <PublicRoute path='/signup' component={Signup} />
        </div>
        </BrowserRouter>
        </AuthProvider>
       
     );
}
 
export default Router;