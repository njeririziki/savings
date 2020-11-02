import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Firebase from '../config'
import {makeStyles} from '@material-ui/core/styles'
import {produce} from 'immer';
import { generate } from "shortid";
import Tooltip  from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
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

const BillsDialog = (props) => {
   
    const [bills,setBills] = React.useState([

        {   id:'0',
            amount: 0 ,
            Name:''   
        },
    ]    
    );
    const [total,setTotal] =React.useState()
    const [error,setError] = React.useState(false)
    const uid = Firebase.auth().currentUser.uid;

    const handleInput =async (e)=>{
        e.preventDefault();
      
     try{
         await Firebase.firestore().collection('Budget').doc(uid).set(
             {
             
             Bills: bills,
             TotalBills : total
             }
         );
       
         props.CloseBillDialog();
        
     } catch (error){
     alert(error)
     }
    }
    const sum =(arr,prop)=>{
       const math= arr.reduce (
            function(a,b){
                return a + b[prop] ;
            },0);
        return  math;
      
    }
    React.useEffect(()=>{
        const totalAmount = sum(bills,'amount');
        setTotal(totalAmount)
    },[bills,total])
    
    // const takeInput= (index) =>(e)=>{
    //         setBills( (currentCategory)=>
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
          open = {props.OpenBillDialog}
          onClose= {props.CloseBillDialog}>     
            <form  
             className= { classes.dialog}
             onSubmit ={handleInput}
             >
         {bills.map((p,index) =>{
          return (
          <div key ={p.id}  className={classes.root}>
             <Textfield
            type ='text'
            label = 'Bill'
            placeholder = 'Electricity'
            variant= 'standard'
            onChange =  {(e)=>{
                const category = e.target.value;
                setBills( currentamount=>
                    produce(currentamount,v=>{
                        v[index].name = category
                    }
                    )
                )
            }
            }
            value={p.name}
            /> 
            <Textfield
            type ='text'
            label= 'amount'
            placeholder = '13200'
            variant= 'standard'
            onChange = {(e)=>{
                const amount = e.target.value;
                if(isNaN(amount)){
                    setError(true)
                } else{
                    setBills( currentField=> produce(currentField,v =>{
                        v[index].amount = Number(amount)
                       }))
                }
              }
          }
          error={error}
          helperText={error?"Please type a number": null}
            
            value={p.amount}
            />
             </div>)
                 })}
                  <Tooltip title ='Add'>
                  <Icon.Plus
                  className={classes.icon}
                  onClick={() =>
                    setBills(currentBills=>[
                        ...currentBills,
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
                onClick={()=>props.CloseBillDialog()}
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
 
export default BillsDialog;