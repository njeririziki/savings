import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Firebase from '../config'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    modal:{
        width :500,
        height:400,
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        
         padding: theme.spacing(2, 4, 3),
        
       },
       modalPaper:{
       
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignSelf:'center'
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
        name:'',
        idno:'',
        phone:''
   })
     
   const uid = Firebase.auth().currentUser.uid
  const submitValues = async (event)=>{
     event.preventDefault();
     try{
      await Firebase.firestore().collection('Users').doc (uid).set({
        Idno : values.idno,
        Phone : values.phone,
        Name : values.name
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
                
                 <div   className={classes.modalPaper}>
                 <form  autoComplete='off'
                 onSubmit = {submitValues}
                 className={classes.modal}
                 >
               
                    <Textfield
                    variant='outlined'
                    id='name'
                    placeholder='name'
                    value={values.name}
                    onChange={handleChange('name')}
                    fullWidth
                    className={classes.other}
                    /><br/><br/>
                    <Textfield
                    variant='outlined'
                    id='idno'
                    placeholder='idno'
                    value={values.idno}
                    onChange={handleChange('idno')}
                    fullWidth
                    className={classes.other}
                    /><br/><br/>
                     <Textfield
                    variant='outlined'
                    id='phone'
                    placeholder='phone'
                    value={values.phone}
                    onChange={handleChange('phone')}
                    fullWidth
                    className={classes.other}
                    /><br/><br/>
                    <Button
                     className={classes.icon}
                    variant='contained'
                    type= 'submit'
                    >
                        submit
                    </Button>
                </form>
                 </div>
            
            </Dialog>
        </div>
     );
}
 
export default GoalModal;
