import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import DialogBody from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Firebase from '../config'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    modal:{
        [theme.breakpoints.up('sm')] :{
            width : 560,
            height:400,
        },
        backgroundColor: theme.palette.background.paper,
        border: 'none',
         padding: theme.spacing(2, 4, 3),
        
       },
       modalPaper:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignSelf:'center',
          [theme.breakpoints.up('sm')] :{
            width : 560,
            height:400,
        },
       },
       dialog:{

       },
    other:{
        marginTop:theme.spacing(5)
     },
     icon:{
        color:'#ffffff',
        
    },
}))
const GoalModal = (props) => {
    const classes= useStyles();
    const [values,setValues] = React.useState({
        title:'',
        amount:'',
        time:''
   })
     
  const submitValues = async (event)=>{
    const uid = Firebase.auth().currentUser.uid
     event.preventDefault();
     try{
      await Firebase.firestore().collection('Goal').doc (uid).set({
         Amount : values.amount,
        Time : values.time,
        Title : values.title
      })
      props.OnClose()
      setValues({})
     } catch (error){
      alert(error)
     }
    }
    const handleChange =name=>event=>{
        setValues({...values,[name]:event.target.value})
    }
    return ( 
       <div>
            <Dialog
            open ={props.OnOpen}
            onClose={props.OnClose}
            >
              
                 <DialogBody>
                 <form  autoComplete='off'
                 onSubmit = {submitValues}
                  className={classes.modal}
                 > 
                <Typography variant='h5'>
                    Set your financial goal
                </Typography>
                 <Textfield
                    variant='outlined'
                    id='title'
                    placeholder='Goal title ie Masters Degree'
                    value={values.title}
                    onChange={handleChange('title')}
                    fullWidth
                    className={classes.other}
                    /><br/>
                    <Textfield
                    variant='outlined'
                    id='Amount'
                    placeholder='Amount to reach goal'
                    value={values.amount}
                    onChange={handleChange('amount')}
                    fullWidth
                    className={classes.other}
                    /><br/>
                     <Textfield
                    variant='outlined'
                    id='time'
                    placeholder='Years to achieve goal'
                    value={values.time}
                    onChange={handleChange('time')}
                    fullWidth
                    className={classes.other}
                    />
                    <br/>
                    <DialogActions>
                    <Button
                    variant='contained'
                    onClick = {props.onClose}
                    >
                    cancel
                    </Button>
                    <Button
                    variant='contained'
                    type= 'submit'
                    >
                    submit
                    </Button>
                    </DialogActions>
                    
                </form>
                </DialogBody>
            
            </Dialog>
        </div>
     );
}
 
export default GoalModal;
