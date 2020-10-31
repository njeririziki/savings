import React, {useEffect,useContext,useCallback} from 'react'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button  from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core';
import {withRouter, Link, Redirect}  from 'react-router-dom'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'
import Firebase from '../config'
import AuthContext from '../Context/AuthContext'

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
typo:{
  marginTop:theme.spacing(3),
  textDecoration:'none',
  color:'#008ba3',
  
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
 
const LogIn = ({history}) => {
    const classes =useStyle();
    const [showPassword,setShowPassword] = React.useState(false)
    // const [values,setValues]=React.useState(
    //     {
    //         email:'',
    //         password:''
    //     }
    // )
    // const takeInput=name=>e=>{
    //     setValues({ ...values,[name]:e.target.vaue})
    // }
    const revPassword=()=>{
      setShowPassword(!showPassword)
  }
    const handleLogin = useCallback(
        async event => {
          event.preventDefault();
          const { email, password } = event.target.elements;
          try {
            await Firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value);
            history.push("/goals");
          } catch (error) {
            alert(error);
          }
        },
        [history]
      );
    //   const {user} = useContext(AuthContext);
    //   if (user){
    //     return  <Redirect to = '/' />
    //   }

    return (
       <> 
            <Container  maxWidth='xs'
            className={classes.container}
            >
                <div className={classes.root}>
               
                <Avatar
                className={classes.avatar}>
                <Icon.LogIn/>
                </Avatar>
                
                <form
                 className={classes.other}
                 onSubmit={handleLogin}>
                    <Textfield
                    variant='outlined'
                    name='email'
                    placeholder='person@gmail.com'
                    label='email'
                    type ='email'
                    fullWidth
                    className={classes.other}
                    required
                    
                    //onChange={takeInput}
                    />
                    <Textfield
                    variant='outlined'
                    name='password'
                    placeholder='*3bwhVH8'
                    type= {showPassword? 'text':'password'}
                    fullWidth
                    required
                    label='password'
                    className={classes.other}
                   
                    helperText='Use letters and characters 8 or more characters'
                    InputProps={ {
                      endAdornment:   <InputAdornment position='end'>
                      <IconButton
                      onClick={revPassword}
                      onMouseDown={(e)=>{
                          e.preventDefault()
                         
                      }}>
                          {showPassword?<Visibility/>:<VisibilityOff/>}
                      </IconButton> 
                  </InputAdornment> 
                    } 
                  }
                   />
                   
                    <Button
                    className={classes.submit}
                    variant='contained'
                    fullWidth
                     type = 'submit'
                    >
                    Log in 
                    </Button>
                </form>
                <Typography
                 className={classes.typo}
                 component ={Link } to ='/signup'
                >
                    Create account
                </Typography>
                </div>
            </Container>
      </> 
      );
}

 
export default withRouter(LogIn) ;