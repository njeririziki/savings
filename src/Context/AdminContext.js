
import React,{useEffect} from 'react';
import Firebase from '../config'


const AdminContext = React.createContext();

const AdminProvider = ({children})=>{
    
    const [admin,setAdmin] = React.useState(false);
   

    useEffect(()=>{
       const unsubscribe = Firebase.auth().onAuthStateChanged()
       .apply( (user)=>{
            const unsub=  Firebase.firestore().collection('UserDetails').doc(user.uid)
         .get().then((doc)=>{
             const role= doc.data().isAdmin;
             setAdmin(role)
         }).catch(error=> console.log(error))
 
         return ()=> unsub
    
       } 
            )
        
       return ()=>unsubscribe    
       
    
    },[])
    
  // const update =()=>setAdmin(true)
    return (
        <AdminContext.Provider value={{admin}} >
            {children}
        </AdminContext.Provider>
    )
    }
 export default AdminContext;
 export {AdminProvider}