import React,{useEffect} from 'react';
import Firebase from '../config'

const PaidContext = React.createContext();
const PaidProvider = () => {
    return ( 
        <PaidContext.Provider>

        </PaidContext.Provider> 
   );
}
 
export default PaidProvider;