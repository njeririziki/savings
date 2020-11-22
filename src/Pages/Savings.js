import React, {useEffect, useState} from 'react';
import Home from '../Components/Home'
import {makeStyles} from '@material-ui/core/styles'
import {List,ListItem, ListItemText, Divider} from '@material-ui/core'
import Firebase from '../config';


const useStyles = makeStyles( (theme) => ({
  root : {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignContent:'center',
      marginTop:theme.spacing(15),
     
  },
}
))

const Savings = () => {
    const classes= useStyles();
    const[trans,setTrans]=useState([])

    useEffect(() => {
        const uid= Firebase.auth().currentUser.uid
      const userRef= Firebase.firestore().collection('Savings').doc(uid).collection('Receipts')
      const unsub=  userRef.get().then((docSnapshot)=>{
        const transactions =[]
          if(docSnapshot.exists){
           userRef.onSnapshot ((snapshot)=>{
         
               snapshot.doc.forEach(doc=>{
                const transaction= {
                    Id:doc.id,
                    ...doc.data()
                   
                } 
                transactions.push(transaction)
               })
             
               setTrans(transactions)
               console.log (transactions)
           })
          }
      }).catch((error)=>
      alert(error))
        return () => unsub
    }, [])

    const content=(
        <div className={classes.root}>
            This are my savings 
            {trans}
            <List>
            {trans.map((p)=>(
                <ListItem
                key={p.Id}>
                <ListItemText
                primary= {p.Time}
                secondary= {p.Amount}
                />
                <Divider/>
                </ListItem>
            ))}
            </List>
            
        </div>
    )
    return (  
        <div>
       <Home
        AppbarName='Savings'
        Content={content}
        />
        </div>
    
    );
}
 
export default Savings;