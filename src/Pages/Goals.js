import React from 'react';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Tooltip  from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container'
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
      justifyContent:'center ',
      
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
      
      
      fontSize: '30px',
      alignSelf: 'center '
     
   },
   container:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'space-around ',
      backgroundColor:'#006978',
      padding: '1em 1em 1em 1em',
      color:'#ffffff',
        
    
    
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
   const [values,setValues] = React.useState({
      title:'',
      amount: 0,
      time:0,
      savings: 0
 })

 
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
    
 const percentage = Math.ceil((values.savings/ values.amount)*100)  ;
 const daysLeft = (values.time*365)-(values.savings/(values.amount/(values.time*365 )))
 const timeLeft =   Math.ceil(daysLeft/30)
 
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
    
       <Container 
    className={classes.container}>
         <Typography
       variant='h3'
       >
         {values.title? ` ${values.title }` :'Set your goal'}
       </Typography>
     
      {values.title?( <Typography
       variant='h4'
       >
        { timeLeft? timeLeft : values.time *12 } months to go!
       </Typography>): null}
    </Container>
     
       <br/>
       <Typography
       variant='h5'
       className={classes.typography}

      >
         {values.amount? `Amount: ${values.amount }` : null}
       </Typography>
    
       <Typography
       variant='h5'
       className={classes.typography}
      >
         {values.time? `Time : ${values.time } years` : null}
       </Typography>
       <Typography
       variant='h5'
       className={classes.typography}>
         {values.savings? `Savings : Ksh ${values.savings }` : null}
       </Typography>
      <br/>
             <CircularProgressbar
       className={classes.circular}
       value = {percentage? percentage: 2}
       text={percentage? `${percentage}%`:'0%'}
       strokeWidth={5}
       styles ={ buildStyles({
           rotation : 0,
           textSize:'20px',
           strokeLinecap:'butt',
           pathTransitionDuration: 0.5,
           pathColor: '#b0003a',
           trailColor:'#82ada9',
           textColor: '#000000',
       })
       }
       />
    
      <Tooltip title =' Create your Schedule '>
      <Fab
       className={classes.fab}
       variant='round'
       onClick={openModal}
       >
       <Icon.Plus
       className={classes.icon}/>
       </Fab>
      </Tooltip>
       
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