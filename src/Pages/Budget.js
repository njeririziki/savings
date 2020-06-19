import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import Firebase from '../config';
import Button from '@material-ui/core/Button'
import * as Icon from 'react-feather'
import BgModal from '../Components/BudgetInput';
import Home from '../Components/Home'
import {makeStyles} from '@material-ui/core/styles'

// interface BudgetArr {
//   category: string,
//   amount: number
// }
const useStyles = makeStyles( (theme) => ({
  root : {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignContent:'center',
      marginTop:theme.spacing(15),
     
  },
  table:{
      width : 460
  },
  fab:{
    backgroundColor:'#000000',
    alignSelf:'flex-end'
 },
 icon:{
     color:'#ffffff',
     
 },
 button :{
  
   backgroundColor:'#000000',
   color:'#ffffff'
 },
 container:{
   backgroundColor:'#00bfa5'
 },
 table:{
  [theme.breakpoints.up('sm')] :{
      width : 560
  }
  
},

}))
const Budget = () => {
  const classes = useStyles()
  const [openForm,setOpenForm]= React.useState(false);
  
  const [ values, setValues] = React.useState([])
  // fetching the budget data
   React.useEffect(()=>{
    const uid = Firebase.auth().currentUser.uid
     const userRef= Firebase.firestore().collection('Budget').doc(uid)
    try{ userRef.get().then(((docSnapshot)=>{
      if (docSnapshot.exists){
       userRef.onSnapshot((doc)=>{
         const budget = doc.data().Budget; 
         setValues (budget)
       })
      }
       
      }))} catch (error){
        alert(error)
      }
      
   },[])
  // opening the dudget input dialog 
  const getData =()=>{
    setOpenForm(true)
  }
  const closeModal=()=>{
    setOpenForm(false)
  }
  //getting the month
  let date = new Date();
  const months =['Jan','Feb','Mar','Apr','May',
                   'Jun','Jul','Aug','Sept','Oct','Nov','Dec']
     let month = months[date.getMonth()]
     let year = date.getFullYear()
  const content=(
    <div className={classes.root}>
   
      
    <BgModal
    OnOpen={openForm}
    OnClose ={closeModal}
    />
    <Container 
    className={classes.container}>
        <Typography
     variant='h4'
        >
        {month} {year}
     </Typography>
    </Container>
    <br/>
    <Container >
       <Table className={classes.table}>
       <TableHead>
                <TableRow>
                <TableCell  >Category</TableCell>
                <TableCell 
                 align='right' >Amount(Ksh)</TableCell>
                </TableRow>  
            </TableHead>
            <TableBody>
            {values.map( (item) =>(
             <TableRow   key={item.id}>
               <TableCell>
               {item.category} 
               </TableCell>
               <TableCell align='right'>
               {item.amount}
               </TableCell>
             </TableRow>
             )) }
             <TableRow>
             
               <TableCell>
               <Typography
                variant='h6'
                    >
                  Daily Savings : 500
                </Typography>
              
               </TableCell>
               <TableCell>
               <Button 
                className={classes.button}
                    variant= 'contained'
                    >
                    Save
              </Button>
               </TableCell>
             </TableRow>
            </TableBody>

       </Table>
     
     <br/>
          </Container>
     
          <Fab 
            className={classes.fab}
    
            onClick={getData}>
            <Icon.Plus
            className={classes.icon}/>
          </Fab>
  </div>
  )
  
    return (
    <div >
    <Home
    Appbarname='Budget'
    Content={content}
    />
    </div>
      );
}
 
export default Budget;
