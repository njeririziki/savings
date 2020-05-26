import React from 'react';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {produce} from 'immer'
import Home from '../Components/Home'

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
        { time:'6.00',activity:'budget',budget: 300,expense:400 }
     ]);
    const [savings,setSavings] = React.useState()

    const openField=()=>{
         setFields((another) =>[...another,{
            time:'',activity:'',budget :'',expense: ''
         }])
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
        const totalBudget = sum (fields,'budget')
        const totalExpense = sum(fields,'expense')
        const diff =totalExpense-totalBudget
        setSavings(diff)
    },[fields]
    )
    const content =(
        <div className={classes.root}>
        <p>Expense</p>
        <Button variant= 'contained'>
            Create Schedule
        </Button>
        <Table  className={classes.table}>
            <TableHead>
                <TableRow>
                <TableCell onClick= {openField}>Time</TableCell>
                <TableCell align='right' >Activity</TableCell>
                <TableCell align='right'>Budget</TableCell>
                <TableCell align='right'>Expenses</TableCell>
                </TableRow>
                
            </TableHead>
            <TableBody>
                {fields.map((p,index)=>(
                   <TableRow key={p.time}>
                     <TableCell >
                     <TextField 
                    onChange={ (e)=>{ 
                      const rn =e.target.value
                        setFields( currentField=> produce(currentField,v =>{
                            v[index].time = rn
                           }))
                        }
                  }
                  value={p.time} 
                  variant='outlined'/>
                         </TableCell>  
                  
                       <TableCell align='right' >
                   <TextField 
                    variant='outlined'
                    onChange={ (e)=>{ 
                         const rn =e.target.value
                        setFields( currentField=> produce(currentField,v =>{
                            v[index].activity = rn
                           }))
                        }
                  }
                  value={p.activity} />
                  </TableCell>
                  <TableCell align='right'  > 
                  <TextField 
                   variant = 'outlined'
                    onChange={ (e)=>{ 
                        const rn = e.target.value; 
                        setFields( currentField=> produce(currentField,v =>{
                            v[index].budget = Number(rn)
                           }))
                        }
                  }
                  value={p.budget}
                  />
                  </TableCell>
                  <TableCell align='right' > 
                   <TextField 
                   align='right'
                    onChange={ (e)=>{ 
                         const rn = e.target.value;
                        setFields( currentField=> produce(currentField,v =>{
                            v[index].expense = Number(rn)
                           }))
                        }
                  }
                  value={p.expense}
                  variant='outlined' />
                  </TableCell>
                   </TableRow> 
                ))}
                
            </TableBody>
        </Table>
                   <pre>{JSON.stringify(fields,null,2)}</pre>
                <p>{savings}</p>
    </div>
    )

    return ( 
      <div>
     <Home
     Appbarname='expenses'
     Content={content}
     />
      </div>
     );
}
 
export default Expense;