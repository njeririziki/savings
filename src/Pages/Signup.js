import React from 'react'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button  from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import Firebase from '../config'

const useStyle= makeStyles(theme=>({


root:{
    marginTop: theme.spacing(8),
    display:'flex',
    justifyContent:'center',
    flexDirection:'column'
},
container:{
    backgroundColor:'#fafafa',

},
avatar:{
    marginTop:theme.spacing(3),
    alignSelf:'center',
   width: theme.spacing(7),
   height: theme.spacing(7),
   backgroundColor:'#000000'
},
other:{
marginTop:theme.spacing(3)
},
submit:{
marginTop:theme.spacing(5),
alignSelf:'center',
backgroundColor:'#000000',
fontFamily:'Titillium Web',
color:'#ffffff',
fontSize:20
}
}))
 


const SignUp = (props) => {
    const classes =useStyle()
    const [showPassword,setShowPassword] = React.useState(false)
    const submitInput = async (event)=>{
        event.preventDefault();
        const { email ,password } = event.target.elements;
        try{
           await Firebase.auth().createUserWithEmailAndPassword(email.value,password.value);
                props.history.push('/goals')
                const uid = Firebase.auth().currentUser.uid;
              await Firebase.firestore().collection('Goal').doc(uid).set(
                 {
                     Savings: 0
                } 
              )
                console.log ('successful')
        } catch {
       alert ('not done')
       }
    }
   
   
    return (
       <> 
            <Container  maxWidth='xs'
            className={classes.container}
            >
                <div className={classes.root}>
                <Avatar
                className={classes.avatar}>
                <Icon.Unlock/>
                </Avatar>
                
                <form
                 onSubmit = {submitInput}
                 className={classes.other}>
                    <Textfield
                    variant='outlined'
                    name='email'
                    type = 'email'
                    placeholder='person@gmail.com'
                    required
                    label='email'
                    fullWidth
                    className={classes.other}
                    />
                    <Textfield
                    variant='outlined'
                    name='password'
                    type = 'password'
                    placeholder='$CT67!gU'
                    label='password'
                    fullWidth
                    required
                    className={classes.other}
                    helperText='Use letters and characters 8 or more characters'
                    InputProps={
                       < InputAdornment position='end'>
                           <IconButton
                           onClick={setShowPassword(true)}
                           onMouseDown={(e)=>{
                               e.preventDefault()
                               setShowPassword(false)
                           }}>
                               {showPassword?<Visibility/>:<VisibilityOff/>}
                           </IconButton>
                       </InputAdornment>
                    }
                    />
                     <Textfield
                    variant='outlined'
                    name='passwordII'
                    type = 'password'
                    placeholder='$CT67!gU'
                    fullWidth
                    required
                    className={classes.other}
                    helperText='Confirm password'
                    label='password'
                    />
                    <Button
                    className={classes.submit}
                    variant='contained'
                    type = 'submit'
                    fullWidth
                  
                    >
                        Sign up
                    </Button>
                </form>
          
                </div>
            </Container>
      </> 
      );
}
 
export default withRouter(SignUp);