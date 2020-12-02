import { Update } from '@material-ui/icons';
import React,{useEffect} from 'react';
import Firebase from '../config'
import {firebase} from '../config'

const AdminContext = React.createContext();

const AdminProvider = ({children})=>{
    
    const [admin,setAdmin] = React.useState(false);

    // useEffect(()=>{
    //     const person = Firebase.auth().currentUser.uid
    //     const unsub=  Firebase.firestore().collection('UserDetails').doc(person)
    //     .get().then((doc)=>{
    //         const role= doc.data().isAdmin;
    //         setAdmin(role)
    //     }).catch(error=> alert(error))

    //     return ()=> unsub
    // })
    
   const update =()=>setAdmin(true)
    return (
        <AdminContext.Provider value={{admin,update}}
       >
            {children}
        </AdminContext.Provider>
    )
    }
 export default AdminContext;
 export {AdminProvider}