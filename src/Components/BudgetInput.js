import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Firebase from '../config'
import {makeStyles} from '@material-ui/core/styles'
import {produce} from 'immer';
import { generate } from "shortid";
import Tooltip  from '@material-ui/core/Tooltip';
import * as Icon from 'react-feather'
import { DialogActions } from '@material-ui/core';

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
 },
 button :{
    backgroundColor:'#000000',
    color:'#ffffff',
    width:200,
    alignSelf:'flex-end'
 },
 icon:{
    alignSelf:'flex-end'
}
}))
const BgDialog = (props) => {
    const [values,setValues] = React.useState([

        {   id:'0',
            amount: 0 ,
            category:''   
        },
    ]    
    );
   
    const [totalBudget,setTotalBudget] =React.useState()
    const [error,setError] = React.useState(false)
    const uid = Firebase.auth().currentUser.uid;

    const handleInput =async (e)=>{
        e.preventDefault();
      
     try{
         await Firebase.firestore().collection('Budget').doc(uid).set(
             {
             Budget: values,
             TotalBudget : totalBudget,
             MoneyLeft:totalBudget,
             }, {merge:true}
         );
         setValues([]);
         props.OnClose();
        
     } catch (error){
     alert(error)
     }
    }
    const sum =(arr,prop)=>{
       const math= arr.reduce(
            function(a,b){
            return a + b[prop];
            },0);
        return  math;
      
    }
    React.useEffect(()=>{
        const totalAmount = sum(values,'amount');
        setTotalBudget (totalAmount)
    },[values])
    
    // const takeInput= (index) =>(e)=>{
    //         setValues( (currentCategory)=>
    //             produce(currentCategory,v=>{
    //                 v[index].name = e.target.value;
    //             }
    //             )
    //         )
        
    // }
    const classes =useStyles();
  
    return (  
        <div >
          <Dialog
          open = {props.OnOpen}
          onClose= {props.OnClose}>     
            <form  
             className= { classes.dialog}
             onSubmit ={handleInput}
             >
         {values.map((p,index) =>{
          return (
          <div key ={p.id}  className={classes.root}>
             <Textfield
            type ='text'
            label = 'category'
            placeholder = 'Food'
            variant= 'standard'
            onChange =  {(e)=>{
                const category = e.target.value;
                setValues( currentamount=>
                    produce(currentamount,v=>{
                        v[index].category = category
                    }
                    )
                )
            }
            }
            value={p.category}
            /> 
            <Textfield
            type ='text'
            label= 'amount'
            variant= 'outlined'
            onChange = {(e)=>{
                const amount = e.target.value;
                if(isNaN(amount)){
                    setError(true)
                } else{
                    setValues( currentField=> produce(currentField,v =>{
                        v[index].amount = Number(amount)
                       }))
                }
              }
          }
          error={error}
          helperText={error?"Please enter a number": null}
            
            value={p.amount}
            />
             </div>)
                 })}
                   <Tooltip title ='Add'>
                   <Icon.Edit
                   className={classes.icon}
                  onClick={() =>
                    setValues(currentValues=>[
                        ...currentValues,
                        {
                            id:generate(),
                            category:'',
                            amount:0
                        }
                    ])
                  }/>
                   </Tooltip>
                 
             <br/><br/>
             <DialogActions>
             <Button 
             className={classes.button}
                onClick={()=>{
                    props.OnClose();
                    setValues([]);} 
                }             
                 variant= 'contained'>
                 Cancel
                </Button>
             <Button 
             className={classes.button}
                type = 'submit'
                variant= 'contained'>
                 Submit
                </Button>
             </DialogActions>
            
            </form>  
          </Dialog> 
        </div>
    );
}
 
export default BgDialog;