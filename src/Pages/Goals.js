import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField';
import * as Icon from 'react-feather';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
      width:250,
      height:250,
      alignSelf:'center'
   }
   
}))

const Goals = (props) => {

   const classes= useStyles();
   const [open,setOpen]=React.useState(false);
   const [isLoading,setIsloading] = React.useState(false)
   const [values,setValues] = React.useState({
      title:'',
      amount:'',
      time:'',
      savings:''
 })
 const percentage = Math.ceil(values.savings/ values.amount)  ;
 const timeLeft = values.amount/values.time*12 ;
 React.useEffect(()=>{
   const uid = Firebase.auth().currentUser.uid
   const userRef =  Firebase.firestore().collection('Goal').doc(uid)
   function unsub() {
      try{
         userRef.get().then((docSnapshot)=>{
        if(docSnapshot.exists){
         userRef.onSnapshot((doc)=>{
            const goal={
               title:  doc.data().Title,
               amount: doc.data().Amount ,
               time:  doc.data().Time ,
               savings: doc.data().Savings
            };
             setValues(goal) ;
             
            });
        }
        })
       
      } catch (error){
         alert(error)
      }   
   } 
   unsub()  
    },[])
   const openModal=()=>{
      setOpen(true)
   }
   const closeModal=()=>{
      setOpen(false)
   }
   const Content=(
      <div
      
    >
       <div className={classes.root}>
       <Typography
       variant='h5'
       className={classes.typography}>
         {values.title? `Goal: ${values.title }` :'Set your goal'}
       </Typography>
       <br/>
       <Typography
       variant='h5'
       className={classes.typography}>
         {values.amount? `Amount: ${values.amount }` : null}
       </Typography>
       <br/>
       <Typography
       variant='h5'
       className={classes.typography}>
         {values.time? `Time : ${values.time }` : null}
       </Typography>
       <Typography
       variant='h5'
       className={classes.typography}>
         {values.savings? `Savings : ${values.savings }` : null}
       </Typography>
       <CircularProgressbar
       className={classes.circular}
       value = {percentage}
       text={`${percentage}%`}
       strokeWidth={5}
       styles ={ buildStyles({
           rotation : 0,
           textSize:'20px',
           strokeLinecap:'butt',
           pathTransitionDuration: 0.5,
           pathColor: `#c62828`,
           trailColor:'#d6d6d6',
           textColor: '#000000',
       })
       }
       />
       {timeLeft}
        <Fab
       className={classes.fab}
       variant='round'
       onClick={openModal}
       >
       <Icon.Plus
       className={classes.icon}/>
       </Fab>
       </div>
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