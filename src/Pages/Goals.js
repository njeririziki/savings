import React from 'react';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ActivityLine from '../Components/Charts/Line'
import Pie from '../Components/Charts/Pie'
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '../Components/Cards/Grid'
import * as Icon from 'react-feather';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Firebase from '../config'
import  GoalModal from '../Components/Modals/GoalModal'
import Home from '../Components/Home';
 
const useStyles = makeStyles(theme=>({
   content:{
      marginTop:theme.spacing(5), 
   },
   root:{
      display:'flex',
      flexDirection:'column' ,
      //gridTemplateColumns: '2fr 2fr',
     // gridTemplateRows:'auto auto ',
     // gridGap: '20px',
      backgroundColor: '#f7f9f8',
      [theme.breakpoints.down('sm')] :{
      display: 'flex',
      flexDirection:'column'      
     }, 
   },
   fab:{
      backgroundColor:'#000000',
      gridColumn:2,
      alignSelf:'flex-end',
      [theme.breakpoints.down('sm')] :{
        alignSelf:'flex-end'
      }
   },
   icon:{
       color:'#ffffff',   
   },
   headIcons:{
      marginRight: theme.spacing(1),
      width: theme.spacing(7),
      height: theme.spacing(7),
      [theme.breakpoints.down('sm')] :{
         marginRight: theme.spacing(0),
         width: theme.spacing(4),
         height: theme.spacing(4),  
      }
   },

   other:{
      marginTop:theme.spacing(5)
   },
   typography:{
      fontSize: '25px',
     // alignSelf: ''
     
   },
   savings:{
      fontSize: '25px',
      color:'#00701a',
     // alignSelf: ''
     
   },
   container:{
      display: 'flex',
      flexDirection: 'row',
      //justifyContent:'space-between ',
      // width:'25vw',
      height:'100px',
      backgroundColor:'#52c7b8',
      padding: '1em 1em 1em 1em',
      color:'#ffffff', 
      '& > *' : {
         margin: theme.spacing(1)
        },
      [theme.breakpoints.down('sm')] :{
         flexDirection: 'row',
        
     },
   },
   containerTime:{
      display: 'flex',
      flexDirection: 'row',
     
     // justifyContent:'space-around ',
      // width:'30vw',
      height:'100px',
      backgroundColor:'#ffbcaf',
      padding: '1em 1em 1em 1em',
      color: '#00363a', 
      '& > *' : {
         margin: theme.spacing(1),
         
        },
      [theme.breakpoints.down('sm')] :{
         flexDirection: 'row',
        
     },
   },
     box:{
      display:'flex',
    //  width : 350,
     height: 'auto',
      flexDirection:'row',
      '& > *' : {
         margin: theme.spacing(0),
      
        },
        padding: '2em 2em 2em 2em',
        marginTop:theme.spacing(3),
      //justifyContent: 'center',
      //alignContent:'center',
      backgroundColor:'#ffffff',
    //  border:" solid 1px #b6b8c3",
      boxShadow:'2px 2px 2px 2px #e8eaf6',
      paddingLeft:theme.spacing(2),
       [theme.breakpoints.down('sm')] :{
          flexDirection:'column',
         width : 250,
         height: 200
     }

   },
   circular:{
      width:200,
      height:200,
      alignSelf:'center'
   },
   
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
      className={classes.content}>
       <div className={classes.root}>
    <Grid/>
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <Box className={classes.box}>
       <ActivityLine/>
    </Box>
    <Box className={classes.box}>
       <Pie/>
    </Box>
    </div>
  
      
     <Box className={classes.box}>
      <CircularProgressbar
       className={classes.circular}
       circleRatio= {0.75}
       value = {percentage? percentage: 80}
       text={percentage? `${percentage}%`:'0%'}
       strokeWidth={5}
       styles ={ buildStyles({
          
           rotation: 1 / 2 + 1 / 8,
           textSize:'20px',
           strokeLinecap:'butt',
           pathTransitionDuration: 0.5,
           pathColor: '#c62828',
           trailColor:'#82ada9',
           textColor: '#000000',
       })
       }
       
       />
       <Typography> Saved 30% <br/>
        Remaining 50%
       </Typography>
     </Box>
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
        Appbarname='Dashboard'
        Content= {Content}
        />
             
        </div>
     );
}
 
export default Goals;



 /* <Box 
    className={classes.container}>
    <Icon.Compass className={classes.headIcons}/>
         <Typography
       variant='h5'>
         {values.title? ` ${values.title }` :'Set your goal'}
       </Typography>
       </Box> 
       <Box className={classes.containerTime}>
       <Icon.Clock className={classes.headIcons}/>
      {values.title?( 
      <Typography variant='h5' >   
        { timeLeft? timeLeft : values.time *12 } months to go!
       </Typography>): null}
       </Box> */
     /* <Box className={classes.box}>
       <Typography
       variant='h5'
        >
         {values.amount? `Amount: ${values.amount } KES` : null}
       </Typography>
       <Typography
       variant='h5'
        >
         {values.time? `Time : ${values.time } years` : null}
       </Typography>
       <Typography
       variant='h5'
       >
         {values.savings? `Savings : Ksh ${values.savings }` : null}
       </Typography>
       <Typography variant='body1'>
         That black 4k HD ave been wanting
       </Typography>
     
     </Box> */