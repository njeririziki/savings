import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Firebase from '../config'
import {makeStyles} from '@material-ui/core/styles'
import {produce} from 'immer';
import { generate } from "shortid";
import Fab from '@material-ui/core/Fab';
import * as Icon from 'react-feather'

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
const BgDialog = (props) => {
    const [values,setValues] = React.useState([

        {   id:'0',
            amount: 12233 ,
            category:'Maintainance'   
        },
    ]    
    );
    const [savings,setSavings] =React.useState()

    const handleInput =async (e)=>{
        e.preventDefault();
        const uid = Firebase.auth().currentUser.uid
     try{
         await Firebase.firestore().collection('Budget').doc(uid).set(
             {
              Amount: values[0].amount ,
              Category : values[0].category
             }
         );
         setValues([]);
         props.OnClose();
        
     } catch (error){
     alert(error)
     }
    }
    const sum =(values,prop)=>{
       const math= values.reduce (
            function(a,b){
                return a + b[prop] ;
            },0);
        return  math;
      
    }
    React.useEffect(()=>{
        const totalAmount = sum(values,`amount`);
        setSavings(totalAmount)
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
          <Fab color = 'secondary'
                 onClick={() =>
                  setValues(currentValues=>[
                      ...currentValues,
                      {
                          id:generate(),
                          category:'',
                          amount:''
                      }
                  ])
                }
                  >
                <Icon.Plus/>
                </Fab>
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
            placeholder = '13200'
            variant= 'standard'
            onChange = {(e)=>{
                const amount = Number(e.target.value);
                setValues( currentamount=>
                    produce(currentamount,v=>{
                        v[index].amount =amount
                    }
                    )
                )
            }
            }
            value={p.amount}
            /> <br/>
             </div>)
                 })}
           
            
             <Button 
                type = 'submit'
                variant= 'contained'>
                 Submit
                </Button>
            </form>  
          </Dialog>
 
            
                
          
        </div>
    );
}
 
export default BgDialog;