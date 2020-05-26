import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField';
import * as Icon from 'react-feather';
import {makeStyles} from '@material-ui/core/styles';
import Firebase from '../config'
import  GoalModal from '../Components/GoalModal'
import Home from '../Components/Home';
const useStyles = makeStyles(theme=>({
   content:{
      marginTop:theme.spacing(15),
     
   },
   root:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      
   },
   fab:{
      backgroundColor:'#000000',
      alignSelf:'flex-end'
   },
   icon:{
       color:'#ffffff',
       
   },

   other:{
      marginTop:theme.spacing(5)
   },
   typography:{
      
      fontFamily:'Merienda',
      fontSize: '20px'
   },
   circular:{
      width:200,
      height:200,
   }
   
}))

const Goals = (props) => {

   const classes= useStyles();
   const [open,setOpen]=React.useState(false);
   const [values,setValues] = React.useState({
      title:'',
      amount:'',
      time:''
 })
 React.useEffect(()=>{
   const unsub = Firebase.firestore().collection('Goal')
   .onSnapshot((snapshot)=>{
     const goal={ title:'',
     amount:'',
     time:'' }
     snapshot.docs.forEach(doc=>{
              goal.amount=doc.data().goalAmount 
               goal.title=doc.data().goalTitle
              goal.time = doc.data().goalTime
       setValues(goal) 
     })
   })
   
         
         return ()=>unsub()
   })
   const openModal=()=>{
      setOpen(true)
   }
   const closeModal=()=>{
      setOpen(false)
   }
   const Content=(
      <div
      className={classes.root}
    >
       <Typography
       variant='h5'
       className={classes.typography}>
         {values.title? `Goal: ${values.title }` :'Set your goal'}
       </Typography>
       <br/>
       <Typography
       variant='h5'
       className={classes.typography}>
         {values.amount? `Amount: ${values.amount }` : 'nothing'}
       </Typography>
       <br/>
       <Typography
       variant='h5'
       className={classes.typography}>
         {values.time? `Time : ${values.time }` : null}
       </Typography>
       
         <Fab
         className={classes.fab}
         variant='round'
         onClick={openModal}
         >
         <Icon.Plus
         className={classes.icon}/>
         </Fab> 
     
        <GoalModal 
        OnOpen={open}
        OnClose={closeModal}/> 
       </div>  
   )
   
    return ( 
        <div  className={classes.content}>
        <Home
        Content= {Content}
        />
             
        </div>
     );
}
 
export default Goals;