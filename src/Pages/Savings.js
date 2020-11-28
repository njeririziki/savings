import React, {useEffect, useState} from 'react';
import Home from '../Components/Home'
import {makeStyles} from '@material-ui/core/styles'
import {List,ListItem, ListItemText, Divider,ListItemIcon} from '@material-ui/core';
import Button  from '@material-ui/core/Button';
import Box  from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Firebase from '../config';
import * as Icon from 'react-feather';
import {PDFDownloadLink} from '@react-pdf/renderer'
import PdfDoc from '../pdf/PdfDoc'

const useStyles = makeStyles( (theme) => ({
  root : {
      display:'flex',
      flexDirection: 'row',
      marginTop:theme.spacing(15),
    
  },
  box:{
      width :'300px',
      height: '200px',
      display:'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignContent:'center',
      backgroundColor:'#ffffff',
      border:" solid 1px #b6b8c3",
      boxShadow:'2px 2px 2px 2px #e8eaf6',
      padding:theme.spacing(2),
     

  },
  container:{
   backgroundColor:'#ffffff',
   border:" solid 1px #b6b8c3",
   width: '700px',
   marginTop:theme.spacing(3),

},
download :{
    backgroundColor:'#b0003a',
   
},
link:{
    color: '#000000',
    textDecoration:'none'
},
header:{
    backgroundColor: '#0f1724',
    color: '#ffffff',
   
}
}
))

const Savings = () => {
    const classes= useStyles();
    const[trans,setTrans]=useState([])
    const [savings,setSavings] =useState()

    useEffect(() => {
        const uid= Firebase.auth().currentUser.uid
      const userRef= Firebase.firestore().collection('Savings').doc(uid).collection('Receipts')
      const unsub=  userRef.get().then((docSnapshot)=>{
        const transactions =[]
      
       docSnapshot.docs.forEach(doc=>{
                const transaction= {
                    id:doc.id,
                    amount: doc.data().Amount,
                    time: doc.data().Time,
                    day: doc.data().Day
                } 
                transactions.push(transaction)
               })
             
               setTrans(transactions)
               console.log (transactions)
           })
           .catch((error)=>
      alert(error))
        return () => unsub
    }, [])
    useEffect(() => {
        const uid = Firebase.auth().currentUser.uid
        const userRef =  Firebase.firestore().collection('Goal').doc(uid)
        const unsub =  userRef.get().then((docSnapshot)=>{
             if(docSnapshot.exists){
              userRef.onSnapshot((doc)=>{
                 const goal= doc.data().Savings
                
                  setSavings(goal) ;
                  console.log (goal)
                 });
             }
             }).catch((error)=>{
              alert(error)
           } )
        return () => unsub
    }, [])
  

    const content=(
        <div className={classes.root}>
           
            <Box
            className={classes.box}>
           
           <Typography variant='h6'>
               Account Balance
               </Typography> 
               <br/>
               <Typography variant='body1'>
              $ {savings} USD
               </Typography>
            </Box>
            <Container
          className={classes.container}>
            <List>
                <ListItem
                className={classes.header}>
                    <ListItemIcon
                     className={classes.header}>
                     <Icon.Sliders/>
                    </ListItemIcon>
                    <ListItemText
                    primary='Recent Activity'/>
                </ListItem>
            {trans.map(p=>
                   
            <ListItem 
            key={p.id}
            >
                 <ListItemIcon>
                     <Icon.Activity/>
                    </ListItemIcon>
            <ListItemText
            primary= {`Amount  $ ${p.amount} USD`}
            secondary={`${p.day} at ${p.time}`}
            
            />
            <Divider/>
            </ListItem>
            )
            }
              <ListItem
              button 
              className={classes.download} >
            
                    <PDFDownloadLink
                document={<PdfDoc trans={trans}/>}
                fileName= "Account Summary"
                className={classes.link}>
                     < ListItemIcon>
                     <Icon.Download/>
                    </ListItemIcon>
             Download Pdf

                </PDFDownloadLink>
                
                </ListItem> 
         
            
            </List>
            </Container> 
           
                
           
         
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