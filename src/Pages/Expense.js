import React from 'react';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import * as Icon from 'react-feather';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip'
import {makeStyles} from '@material-ui/core/styles';
import {produce} from 'immer'
import Home from '../Components/Home'
import Exdialog from '../Components/ExInput'

const useStyles = makeStyles( (theme) => ({
    root : {
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignContent:'center',
        marginTop:theme.spacing(15),
       
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
       '& > *' : {
        margin: theme.spacing(1)
       }
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

// interface Schedule {
//   time: string;
//   activity:string;
//   budget: number;
//   expense:number;
// }

const Expense = () => {
    const classes = useStyles()
    const [fields,setFields] = React.useState([ 
 
     ]);
    const [savings,setSavings] = React.useState()
    const [openForm,setOpenForm]= React.useState(false);
    
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
    const months =['Jan','Feb','Mar','Apr','May',
                   'Jun','Jul','Aug','Sept','Oct','Nov','Dec']
     let month = months[date.getMonth()]
     const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
     let weekday = days[date.getDay()]
      
     // getting the savings amount
     const sum = (arr,prop)=>{
        const math = arr.reduce(
            function (a,b){
                return a+ b[prop] 
            },0
        )
        return math;
    }
    // set schedule to local storage
    React.useEffect( ()=>{
       
        const json = localStorage.getItem('Schedule')
        const values = JSON.parse(json);
        setFields(values)
    },[])

    React.useEffect( ()=>{
        const totalBudget = sum (fields,'budget')
        const totalExpense = sum(fields,'expense')
        const diff = totalBudget-totalExpense
        setSavings(Math.abs(diff))
       
    
    },[fields]
    ) 
  

    const content =(
        <div className={classes.root}>
         <Container 
    className={classes.container}>
          <Typography
     variant='h3'>
        {day}
     </Typography>
        <Typography
     variant='h6'
        >
        {month} <br/>    {weekday}
     </Typography>
     <Typography
     variant='h6'
        >
      
     </Typography>
    
        </Container>
        <Table  className={classes.table}>
            <TableHead>
                <TableRow>
                <TableCell variant='head' >Time</TableCell>
                <TableCell variant='head'
                 align='right' >Activity</TableCell>
                <TableCell variant='head'
                align='right'>Budget</TableCell>
                <TableCell variant='head'
                align='right'>Expenses</TableCell>
                </TableRow>  
            </TableHead>
            <TableBody>
                {fields.map((p,index)=>(
                   <TableRow key={p.time}>
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
                  <TableCell align='right' > 
                  {p.expense}
                  
                  </TableCell>
               
                   </TableRow> 
                ))}
                <TableRow>
                    <TableCell rowSpan={2}/>
                    
                    <TableCell align='right'
                    colSpan={2} > 
                   Savings :{savings}
                  
                  </TableCell>
                  <TableCell align='right' > 
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
             
             
         
     <Tooltip title =' Create your budget '>
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