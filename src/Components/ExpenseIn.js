import React from 'react';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {produce} from 'immer'
import Dialog from '@material-ui/core/Dialog'

const useStyles= makeStyles(theme=>({
    root:{
        display: 'flex',
        '& > *' : {
           margin: theme.spacing(1)
       }
    },
    dialog:{
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'space-between',
       margin : theme.spacing(3)
    }
   }))

class ExpenseIn extends React.Component {
    constructor(props){
        super(props);
       this.state = { 
           fields:[
            { time:'6.00',activity:'Transport',budget : 100,expense: 80}
           ],
         
        }
        this.openField = this.openField.bind(this)
    }
     openField = (setState)=>{
        this.setState((another) =>
        this.state.fields = [...another,{
           time:'',activity:'',budget :0,expense: 0
        }])
    }
    
    render() { 
        return ( 
            <Dialog
            open ={this.props.open}
           onClose
            >
                        <Table  >
            <TableHead>
                <TableRow>
                <TableCell onClick= {this.openField}>Time</TableCell>
                <TableCell align='right' >Activity</TableCell>
                <TableCell align='right'>Budget</TableCell>
                <TableCell align='right'>Expenses</TableCell>
                </TableRow>
                
            </TableHead>
            <TableBody>
                {this.state.fields.map((p,index)=>(
                   <TableRow key={p.time}>
                     <TableCell >
                   {p.time? p.time:
                   <TextField 
                   onChange={ (e)=>{ 
                     const rn =e.target.value
                       this.setState.fields( currentField=> produce(currentField,v =>{
                           v[index].time = rn
                          }))
                       }
                 }
                 value={p.time} 
                 variant='outlined'/>} 
                         </TableCell>  
                  
                       <TableCell align='right' >
                   <TextField 
                    variant='outlined'
                    onChange={ (e)=>{ 
                         const rn =e.target.value
                         this.setState.fields( currentField=> produce(currentField,v =>{
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
                        this.setState.fields( currentField=> produce(currentField,v =>{
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
                         this.setState.fields( currentField=> produce(currentField,v =>{
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
            </Dialog>
         );
    }
}
 
export default ExpenseIn;