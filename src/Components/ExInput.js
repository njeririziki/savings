import React from 'react';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import {produce} from 'immer'
import Dialog from '@material-ui/core/Dialog';
import {DialogContent,DialogActions} from '@material-ui/core'


 const Expense = (props) => {
    const [fields,setFields] = React.useState([ 
       {}  
     ]);
    const openField=()=>{
        setFields((another) =>[...another,{
           time:0 ,activity:'',budget :0,expense: 0
        }])
    }
    const saveInput =()=>{
        if (fields){
            const json = JSON.stringify(fields);
           localStorage.setItem('Schedule',json)
    
        }
    }
    
    return (
        <Dialog
        open ={props.open}
        onClose = {props.close}
        >
            <DialogContent>
                  <Table  >
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
                ))
               
             }   
            </TableBody>
          
        </Table>
        </DialogContent>
        <DialogActions>
            <Button
              variant='contained'
              onClick = {props.close}
              >
                Clear
            </Button>
            <Button
            variant='contained'
            onClick={saveInput}>
                Save
            </Button>
        </DialogActions>
        </Dialog>
      ); 
 }

export default Expense;