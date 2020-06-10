import React from 'react';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import * as Icon from 'react-feather';
import TextField from '@material-ui/core/TextField';
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
    
    const openDialog =()=>{
        setOpenForm(true)
      }
      const closeDialog=()=>{
        setOpenForm(false)
      }
   
     const sum = (arr,prop)=>{
        const math = arr.reduce(
            function (a,b){
                return a+ b[prop] 
            },0
        )
        return math;
    }
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
        
        <Table  className={classes.table}>
            <TableHead>
                <TableRow>
                <TableCell >Time</TableCell>
                <TableCell align='right' >Activity</TableCell>
                <TableCell align='right'>Budget</TableCell>
                <TableCell align='right'>Expenses</TableCell>
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
                
            </TableBody>
        </Table>
                 
                <p> Savings {savings}</p>
                
        <Fab 
        className={classes.fab}
        onClick={openDialog}>
        <Icon.Plus
        className={classes.icon}/>
        </Fab>
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