import React from 'react'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button  from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import Firebase from '../config'

const useStyle= makeStyles(theme=>({
 body:{
    backgroundColor:'#f1f1f1', 
 },

root:{
    marginTop: theme.spacing(8),
    display:'flex',
    justifyContent:'center',
    flexDirection:'column'
},
container:{
    backgroundColor:'#f1f1f1'
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
                <Icon.LogIn />
                </Avatar>
                
                <form
                 onSubmit = {submitInput}
                 className={classes.other}>
                    <Textfield
                    variant='outlined'
                    name='email'
                    type = 'email'
                    placeholder='Email'
                   // onChange = {takeInput}
                    fullWidth
                    className={classes.other}
                    />
                    <Textfield
                    variant='outlined'
                    name='password'
                    type = 'password'
                    placeholder='Password'
                   // onChange= {takeInput}
                    fullWidth
                    className={classes.other}
                    />
                     <Textfield
                    variant='outlined'
                    name='passwordII'
                    type = 'password'
                    placeholder='Confirm Password'
                    fullWidth
                    className={classes.other}
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
                <Typography
                 className={classes.other}
                >
                  Proceed
                </Typography>
                </div>
            </Container>
      </> 
      );
}
 
export default withRouter(SignUp);