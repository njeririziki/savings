import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import Firebase from '../config';
import Button from '@material-ui/core/Button'
import Tooltip  from '@material-ui/core/Tooltip';
import * as Icon from 'react-feather'
import BgModal from '../Components/BudgetInput';
import BillsDialog from '../Components/Bills'
import Home from '../Components/Home';
import PayFunc from '../Components/PaypalComp'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles( (theme) => ({
  root : {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignContent:'center',
      marginTop:theme.spacing(15),
     
  },


  fab:{
    marginTop:theme.spacing(5),
    backgroundColor:'#000000',
    alignSelf:'flex-end'
 },
 icon:{
     color:'#ffffff',
     
 },
 button :{
  width:'400',
  backgroundColor:'#000000',
  color:'#ffffff', 
},

 container:{
   backgroundColor:'#c8e6c9',
   padding: '2em 2em 2em 2em'
 },
 table:{
  [theme.breakpoints.up('sm')] :{
      width : 460
  }
  
},

}))
const Budget = () => {
  const classes = useStyles()
  const [openForm,setOpenForm]= React.useState(false);
  const [openBills,setOpenBills]= React.useState(false);
  const [total, setTotal]=React.useState()
  const [totalBills,setTotalBills]= React.useState();
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
        const totalBudget= doc.data().Savings;
         setTotal(totalBudget)
         const totalBills= doc.data().TotalBills;
         setTotalBills(totalBills)
       })
      }
       
      }))} catch (error){
        alert(error)
      }
      
   },[])

  const getData =()=>{
    setOpenForm(true)
  }
  const closeModal=()=>{
    setOpenForm(false)
  }
  const closeBills=()=>{
    setOpenBills(false)
  }
  const openDialog=()=>{
    setOpenBills(true)
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
            {values? values.map( (item) =>(
             <TableRow   key={item.id}>
               <TableCell>
               {item.category} 
               </TableCell>
               <TableCell align='right'>
               {item.amount}
               </TableCell>
             </TableRow>
             )):
             (<TableRow>
              <TableCell  colSpan={3}> 
              Create a Budget
                </TableCell> 
             </TableRow>) }
            
               <TableRow>
                 <TableCell>
                 <Typography
                variant='body1'

                    >
                <b>Total</b> 
                </Typography>
                 </TableCell>
                 <TableCell align='right'>
                <b>{total}</b>
                 </TableCell>
               </TableRow>
             <TableRow >
             <TableCell rowSpan={2}>
               <Button 
               variant="contained"
               className={classes.button}
               onClick={openDialog}>
                 Pay Bills
               </Button>
              
               </TableCell>
               <TableCell rowSpan={2}>
                 <b>Total:{totalBills}</b>
               </TableCell>
              
               <TableCell  rowSpan={2}>
                 {totalBills?  <PayFunc price={totalBills}/>:
                 null}
              
               </TableCell>
             </TableRow>
              
           
            </TableBody>

       </Table>
       <BillsDialog
    OpenBillDialog={openBills}
    CloseBillDialog={closeBills}
      />
   
     <br/>
          </Container>
          <Tooltip title =' Create your Schedule '>
          <Fab 
            className={classes.fab}
            onClick={getData}>
            <Icon.Plus
            className={classes.icon}/>
          </Fab>
          </Tooltip>
        
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
