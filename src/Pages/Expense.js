import React from 'react';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import * as Icon from 'react-feather';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip'
import {makeStyles} from '@material-ui/core/styles';
import {produce} from 'immer';
import Firebase, { firebase} from '../config'
import Home from '../Components/Home';
import PayFunc from '../Components/PaypalComp'
import Exdialog from '../Components/Modals/ExInput'
import InputComp from '../Components/Ocr/InputComp'


const useStyles = makeStyles( (theme) => ({
    root : {
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignContent:'center',
        marginTop:theme.spacing(8),
       
    },
    table:{
        [theme.breakpoints.up('sm')] :{
            width : 560
        }
        
    },
    fab:{
        backgroundColor:'#000000',
        alignSelf:'flex-end'
     },
     icon:{
        color:'#ffffff',   
    },
    container:{
      backgroundColor:'#cfd8dc',
       display: 'flex' ,
       flexDirection:'row',
     //  width: '550px',
       '& > *' : {
        margin: theme.spacing(1)
       },
      
      },
      savcontainer:{
        display: 'flex' ,
        flexDirection:'row',
        
        width: 560
      },
      button :{
        width:'300',
        backgroundColor:'#000000',
        color:'#ffffff', 
      }
}))


const Expense = () => {
    const classes = useStyles()
    const [fields,setFields] = React.useState([ ]);
    const [expenses,setExpenses] = React.useState([]);
    const [error,setError] = React.useState(false)
    const [savings,setSavings] = React.useState()
    const [openForm,setOpenForm]= React.useState(false);
    const [transfer,setTrasfer]= React.useState(false)
    
    // opening the input dialog
    const openDialog =()=>{
        setOpenForm(true)
      }
      const closeDialog=()=>{
        setOpenForm(false)
      }
      // getting the date
    let date = new Date();
    let day = date.getDate()
    let year = date.getFullYear()
    const months =['Jan','Feb','Mar','Apr','May',
                   'Jun','Jul','Aug','Sept','Oct','Nov','Dec']
     let month = months[date.getMonth()]
     const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
     let weekday = days[date.getDay()]
     let tonow = day +''+ month + '' + year;
     //getting the time
     let hour = date.getHours();
     let minutes = date.getMinutes()
     if (minutes<10){
       minutes= '0' + minutes ;
     }
     if (hour<10){
       hour= '0'+ hour;
     }
     let exactTime = `${hour}:${minutes}` 
      
     // getting the budget amount
     const sum = (arr,prop)=>{
        const math = arr.reduce(
            function (a,b){
                return a+ b[prop] 
            },0
        )
        return math;
    }
    const sumExpenses = (arr)=>{
      const math = arr.reduce((a,b) =>{
        return a+b
      },0)
      return math;
    } 

    React.useEffect(()=>{
      const uid = Firebase.auth().currentUser.uid
       const userRef= Firebase.firestore().collection('Expenses').doc(uid)
      try{ userRef.get().then(((docSnapshot)=>{
        if (docSnapshot.exists){
         userRef.onSnapshot((doc)=>{
           const dailyBudget = doc.data().Expenses; 
           setFields(dailyBudget)
         
         })
        }
         
        }))} catch (error){
          alert(`Please try adding a new schedule or refreshing the page${error}`)
        }
        
     },[])
  React.useEffect( () => {
       const uid=  Firebase.auth().currentUser.uid
        const totalBudget = sum (fields,'budget')
        console.log(`total budget ${totalBudget}`)
        Firebase.firestore().collection('Budget').doc(uid).set(
          {
          DailyBudget : totalBudget
          }, {merge:true}
         ).then( console.log('sent') ).catch(err=>{ alert(err)})
        
        const totalExpense = sumExpenses(expenses)
        console.log(`total expense ${totalExpense}`)
        if(totalBudget > totalExpense) {
            const diff =  totalBudget-totalExpense;
            console.log(`savings ${diff}`)
             setSavings(Math.abs(diff)); 
           }  else{
            setSavings('0'); 
           } 
    },[fields,expenses])
    const totalBudget = sum (fields,'budget')
    const totalExpense = sumExpenses(expenses)
   // get the savings 
  //  React.useEffect(() => {
  //   const uid = Firebase.auth().currentUser.uid;
  //   const unsub = async()=>{
  //     const totalBudget = sum (fields,'budget')
  //     try{  
  //        await Firebase.firestore().collection('Budget').doc(uid).set(
  //       {
  //       DailyBudget : totalBudget
  //       }, {merge:true}
  //      ).then( console.log('sent') ).catch(err=>{ alert(err)})
      
  //     } catch(error){
  //      alert(error)
  //     }
  //   }
  //   return () => unsub
    
  // }, [fields])
   
    // upload savings to firebase
    const openPay=()=>{
      setTrasfer(true)
    }
    const unsubscribe= async ()=> {
      const uid=  Firebase.auth().currentUser.uid;
      try{
        await Firebase.firestore().collection('Goal').doc(uid)
        .update({
        Savings : firebase.firestore.FieldValue.increment(savings)
        });
      
        await Firebase.firestore().collection('Savings').doc(uid)
        .collection('Receipts').doc(exactTime)
        .set({
          Amount: savings,
          Time : exactTime,
          Day: tonow
        });
        
        await Firebase.firestore().collection('Budget').doc(uid).update({
          MoneyLeft: firebase.firestore.FieldValue.increment(-totalBudget)
          }).then( console.log('sent') ).catch(err=>{ alert(err)})
        
      } catch(error){
        alert(`Please add values correctly ${error}`)
      } 
    } 
  

    const content =(
        <div className={classes.root}>
         <Box className={classes.container}>
           <Typography variant='h3'>
              {day}
          </Typography>
              <Typography  variant='h5' >
              {month} <br/>  {weekday}
          </Typography>
     
        </Box>
   
       <InputComp/>
        <Table  className={classes.table}>
            <TableHead>
                <TableRow>
                <TableCell variant='head' >Time</TableCell>
                <TableCell variant='head'
                 align='right' >Activity</TableCell>
                <TableCell variant='head'
                align='right'>Budget</TableCell>
                <TableCell variant='head'
                align='center'>Expenses</TableCell>
                </TableRow>  
            </TableHead>
            <TableBody>
            {fields.length>= 1? ( fields.map ((p,index)=>(
                   <TableRow key={p.id}>
                     <TableCell >
                   {p.time? p.time: 'Create a schedule'
                   } 
                    </TableCell>  
                  
                  <TableCell align='right' >
                  {p.activity} 
                  </TableCell>
                  <TableCell align='right'  > 
                { p.budget}
                  
                  </TableCell>
                  <TableCell  align='right' > 
                   
                  <TextField
                 variant ='outlined'
                 onChange ={(e)=>{
                    e.preventDefault();
                    const val = e.target.value;
                    if(isNaN(val)){
                      setError(true)
                    } else{
                      setExpenses( 
                        currentamount=>
                        produce(currentamount,v=>{
                            v[index] = Number(val) 
                        } ))
                    }
                    }}
                    error={error}
                    helperText={error?'please enter a number':null}
                 /> 
                 
                  </TableCell>
               
                   </TableRow> 
                ))):
              (<TableRow>
               <TableCell  colSpan={3}> 
               Create a schedule
                 </TableCell> 
              </TableRow>)
              }
              <TableRow>
              <TableCell  > 
                
                </TableCell> 
                
                  <TableCell align='right'
                  > 
                <b>Daily Budget:</b> 
                
                </TableCell>
                <TableCell align='right' > 
               <b>{totalBudget}</b> 
              </TableCell>
              <TableCell align='right' > 
                <b>{totalExpense}</b>
                </TableCell>  
              </TableRow>
                <TableRow>
                <TableCell  > 
                
                  </TableCell> 
                  
                    <TableCell align='right'
                    > 
                  <b> Savings:</b> 
                  
                  </TableCell>
                  <TableCell align='right' > 
                  {savings}
                </TableCell> 
                  <TableCell align='right' > 
                  <Button 
                    className={classes.button}
                    onClick={openPay}
                    variant= 'contained'
                        >
                        Save
                  </Button>
                  </TableCell>
                {transfer? 
                 <PayFunc 
                 price  ={savings}
               afterFunc={unsubscribe}/>
                :null}
                  
                </TableRow>    
            </TableBody>
        </Table>
          
                 
         
     <Tooltip title =' Create your Schedule '>
     <Fab 
        className={classes.fab}
        onClick={openDialog}>
        <Icon.Plus
        className={classes.icon}/>
        </Fab>
        </Tooltip>  
             
       
    </div>
    )

    return ( 
      <div>
     <Home
     Appbarname='Expenses'
     Content={content}
     />
     <Exdialog
     open ={openForm}
     close ={closeDialog}
     />
      </div>
     );
}
 
export default Expense;
/* 
    <TextField
                 variant ='outlined'
              
                 onChange ={ (e)=>{
                   e.preventDefault();
                   const val = e.target.value;
                   setExpenses(
                     (currentExpense)=>[ 
                       ...currentExpense,
                       val
                     ]
                    )}}
                 />
                    <TableCell>
                  <Button 
                    className={classes.button}
                    onClick={findSavings}
                    variant= 'contained'
                        >
                        Total Savings
                  </Button>
                  </TableCell>
                 */