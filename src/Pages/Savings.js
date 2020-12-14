import React, {useEffect, useState} from 'react';
import Home from '../Components/Home'
import {makeStyles} from '@material-ui/core/styles'
import {List,ListItem, ListItemText, Divider,ListItemIcon} from '@material-ui/core';
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
      [theme.breakpoints.down('sm')] :{
        flexDirection: 'column',
    }
    
  },
  box:{
     
      display:'flex',
      width : 300,
      height: 200,
      flexDirection:'column',
      justifyContent: 'center',
      alignContent:'center',
      backgroundColor:'#ffffff',
      border:" solid 1px #b6b8c3",
      boxShadow:'2px 2px 2px 2px #e8eaf6',
      padding:theme.spacing(2),
      [theme.breakpoints.down('sm')] :{
        width : 250,
        height: 200
    }

  },
  container:{
   backgroundColor:'#ffffff',
   border:" solid 1px #b6b8c3",
   width : 700,
   marginTop:theme.spacing(3),
   [theme.breakpoints.only('md')] :{
    width : 460
},
[theme.breakpoints.down('sm')] :{
    width : 330
}
},
download :{
    backgroundColor:'#c5e1a5',
   
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
    const [savings,setSavings] =useState({   
            title:'',
            amount: 0,
            time:0,
            savings: 0
        })

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
              
           })
           .catch((error)=>
      alert(error))
        return () => unsub
    }, [])
  

    useEffect(() => {
        const uid = Firebase.auth().currentUser.uid
        const userRef =  Firebase.firestore().collection('Goal').doc(uid)
        try{
            userRef.get().then((docSnapshot)=>{
                if(docSnapshot.exists){
                 userRef.onSnapshot((doc)=>{
                    const goal= {
                       title:  doc.data().Title,
                       amount: doc.data().Amount ,
                       time:  doc.data().Time ,
                       savings: doc.data().Savings
                    }
                   
                     setSavings(goal) ;
                     console.log (goal)
                    });
                }
                }).catch((error)=>{
                 alert(error)
              } )

        } catch(error){
         alert(error)
        }
           
       
    },[])
    const amountNeeded = Number(savings.amount) 
    const amountSaved= Number(savings.savings)
    const percentage = Math.ceil((amountSaved/ amountNeeded)*100)  ;
    const daysLeft = (savings.time*365)-(amountSaved/(amountNeeded/(savings.time*365 )))
    const timeLeft =   Math.ceil(daysLeft/30)
    

    const content=(
        <div className={classes.root}>
           
            <Box
            className={classes.box}>
          
           <Typography variant='h6'>
             Goal : {savings.title}
               </Typography> 
               <br/>
               <Typography variant='body1'>
               Account Balance : $ {savings.savings} <br/>
               Percentage covered: { isNaN(percentage)? '0':percentage} % <br/>
               TimeLeft : { isNaN(timeLeft) ?  '0': timeLeft} months
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
                document={<PdfDoc trans={trans}
                goalTitle={savings.title}
                goalAmount={savings.amount}
                goalTime={savings.time}
              goalTimeLeft={timeLeft}
              percentage={percentage }
                savings={savings.savings}
                />}
                fileName= "Account Summary"
                className={classes.link}>
                     < ListItemIcon>
                     <Icon.Download/>
                    </ListItemIcon>
             Download Report
                </PDFDownloadLink>
                
                </ListItem> 
         
            
            </List>
           
            </Container> 
            
        </div>
    )
    return (  
        <div>
       <Home
        Appbarname='Savings'
        Content={content}
        />
        </div>
    
    );
}
 
export default Savings;