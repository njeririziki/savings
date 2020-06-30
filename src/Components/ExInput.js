import React from 'react';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import {produce} from 'immer'
import Dialog from '@material-ui/core/Dialog';
import {DialogContent,DialogActions} from '@material-ui/core';
import * as Icon from 'react-feather';
import Firebase from '../config';
import { generate } from "shortid";


 const Expense = (props) => {
    const [fields,setFields] = React.useState([ 
       {
           id:'0',
           time:0,
           activity:'',
           budget:0
       }  
     ]);

    const openField=()=>{
        setFields((another) =>[...another,
            {
         id: generate() , 
         time:0 ,
         activity:'',
         budget :0
        }
    ])
    }
    const saveInput =(e)=>{
       e.preventDefault()
        if (fields){
            const json = JSON.stringify(fields);
           localStorage.setItem('Schedule',json);
          
        };
        props.close()
        
    }
    
    
    return (
        <Dialog
        open ={props.open}
        onClose = {props.close}
        >  
           <form   onSubmit={saveInput}> 
           <DialogContent>
           <Table  >
            <TableHead>
                <TableRow>
                <TableCell >Time</TableCell>
                <TableCell  >Activity</TableCell>
                <TableCell >Budget</TableCell>
                <TableCell >
                    <Icon.Edit
                 onClick= {openField}/>
                 </TableCell>
                </TableRow>
                
            </TableHead>
            <TableBody>
                {fields.map((p,index)=>(
                   <TableRow key={p.id}>
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
            type='submit'>
                Save
            </Button>
        </DialogActions>
           </form>
               
                 
        
        </Dialog>
      ); 
 }

export default Expense;