import { Update } from '@material-ui/icons';
import React,{useEffect} from 'react';
import Firebase from '../config'
import {firebase} from '../config'

const AdminContext = React.createContext();

const AdminProvider = ({children})=>{
    
    const [admin,setAdmin] = React.useState(false);
    const update=()=>setAdmin(true)

    return (
        <AdminContext.Provider value={{admin, update}}
       >
            {children}
        </AdminContext.Provider>
    )
    }
 export default AdminContext;
 export {AdminProvider}