import React,{useContext} from 'react'
import {Route,Redirect} from 'react-router-dom'
import AuthContext ,{AuthProvider} from './Context/AuthContext'


const PrivateRoute = ({
    component:Component  ,...rest}) => 
    {
     const {user} = useContext(AuthContext)
    return (
        <div>
        <Route  {...rest}
        component= {(props)=>(
            user?
            (<Component {...props} />) :
             (< Redirect to='/logIn'/>)
        )    
        }/>
        </div>
      );
}
 const  PublicRoute=({
    component:Component 
    ,...rest}) => 
    {
     const {user} = useContext(AuthContext)
    return (
        <div>
        <Route  {...rest}
        component= {(props)=>(
            user?
            (< Redirect to='/'/>):
            (<Component {...props} />)      
        ) }/>
         </div>
      );
}
const AdminRoute = ({
    component:Component 
    ,...rest}) => 
    {
     const {user} = useContext(AuthContext)
    return (
        <div>
        <Route  {...rest}
        component= {(props)=>(
            user?
            (<Component {...props} />) :
             (< Redirect to='/logIn'/>)
        )
          
        }/>
        </div>
      );
}
 export {PrivateRoute,PublicRoute,AdminRoute}

