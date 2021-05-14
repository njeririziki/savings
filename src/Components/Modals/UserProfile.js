import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Firebase from '../../config'
import {makeStyles} from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'


const useStyles = makeStyles(theme=>({
    modal:{
        width :560, 
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
    button :{
        backgroundColor:'#000000',
        color:'#ffffff',
        width:200,
        alignSelf:'flex-end'
     },
}))
const GoalModal = (props) => {
    const classes= useStyles();
    const [values,setValues] = React.useState({
        name:'',
        email:''
   })
   const [passwordO,setPasswordO]= React.useState()
   const [password,setPassword]= React.useState()
   const [showPassword,setShowPassword] = React.useState(false)
   const [valid,setValid] = React.useState(true)
   const [error,setError] = React.useState(false)
   const revPassword=()=>{
       setShowPassword(!showPassword)
   }
     
   const user = Firebase.auth().currentUser;
  const submitValues = async (event)=>{
     event.preventDefault();
     try{
      await user.updatePassword(passwordO).then((pass)=>{
        console.log('uodated' + pass)
       })
      props.OnClose()
      setValues({})
     } catch (err){
      alert(err)
     }
    }
    React.useEffect(()=>{
      if(values.name&& values.email){
        const unsub= user.updateProfile({

            displayName : values.name,
            email:values.email
          })
       

  return () => unsub;
      }
     

    },[user,values])
    const handleChange =name=>event=>{
        setValues({...values,[name]:event.target.value})
    }
    const invalid =(e)=>{
        const val = e.target.value
        setPassword(val)
        if(password === passwordO) {
            setValid(false);
            setError(false)
        }else {
            setValid(false);
            setError(true)
        }
     }
    return ( 
       <div>
            <Dialog
            open ={props.OnOpen}
            onClose={props.OnClose}
            >
                
                 <div className={classes.modalPaper}>
                 <form autoComplete='off'
                 onSubmit = {submitValues}
                 className={classes.modal}
                 >
                    <Textfield
                    variant='outlined'
                    id='name'
                    placeholder='Username'
                    label='Username'
                    value={values.name}
                    onChange={handleChange('name')}
                    fullWidth
                    className={classes.other}
                    /><br/><br/>
                      <Textfield
                    variant='outlined'
                    name='email'
                    type = 'email'
                    placeholder='person@gmail.com'
                 
                    label='Update email'
                    fullWidth
                    className={classes.other} 
                    />
                    <Textfield
                    variant='outlined'
                    name='password'
                    type = {showPassword? 'text':'password'}
                    placeholder='$CT67!gU'
                    label='password'
                    onChange={(e)=>{
                      const val= e.target.value;
                      if (val.length > 8){
                          setError(true)
                      } else{
                        setPasswordO(val)
                        setError(false)
                      }
                        
                    }}
                    error={error}
                    helperText='Use letters and characters 8 or more characters'
                    fullWidth
                 
                    className={classes.other}
                    InputProps={{
                        endAdornment:< InputAdornment position='end'>
                        <IconButton
                        onClick={revPassword}
                        onMouseDown={(e)=>{
                            e.preventDefault()  
                        }}>
                            {showPassword?<Visibility/>:<VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                    } }
                    />
                     <Textfield
                    variant='outlined'
                    name='passwordII'
                    type = {showPassword? 'text':'password'}
                    placeholder='$CT67!gU'
                    fullWidth
                    onChange={ invalid }
                    error={error}
               
                    className={classes.other}
                    helperText='Confirm password'
                    label='password'
                    InputProps={{
                        endAdornment: < InputAdornment position='end'>
                        <IconButton
                        onClick={revPassword}
                        onMouseDown={(e)=>{
                            e.preventDefault()
                           
                        }}>
                            {showPassword?<Visibility/>:<VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                    } }
                    />
                   
                   <br/>
                    <DialogActions> <Button
                  className={classes.button}
                  variant='contained'
                  onClick={ ()=>{
                      props.OnClose();
                      setValues({})  
                  }}>
                     Cancel
                      </Button> 
                    <Button
                     className={classes.button}
                     disabled={valid}
                    variant='contained'
                    type= 'submit'
                    >
                        submit
                    </Button>
                 </DialogActions>
                 
                </form>
                 </div>
            
            </Dialog>
        </div>
     );
}
 
export default GoalModal;

/**           <Textfield
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
                    className={classes.other} */