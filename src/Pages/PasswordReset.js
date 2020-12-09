import React from 'react';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Firebase from '../config'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import * as Icon from 'react-feather';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'

const useStyle= makeStyles(theme=>({
 

    root:{
        marginTop: theme.spacing(8),
        display:'flex',
        justifyContent:'center',
        flexDirection:'column'
    },
    container:{
        backgroundColor:'#f2f2f2',
    
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

const PasswordReset = () => {

    const classes =useStyle(); 
    const handleEmail=(e)=>{
        e.preventDefault();
    const email  = e.target.value;
        Firebase.auth().sendPasswordResetEmail(email,{url:'http://localhost:3000/login'})
        .then((email)=>{
        alert({email} +'email sent');
      }
      ).catch(alert('an error occured'))
    }
    return ( 
       <div>
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
                 onSubmit={handleEmail}>
                    <Textfield
                    variant='outlined'
                    name='email'
                    placeholder='person@gmail.com'
                    label='email'
                    type ='email'
                    fullWidth
                 
                    className={classes.other}
                    required
                    />
                       <Button
                    className={classes.submit}
                    variant='contained'
                    fullWidth
                     type = 'submit'
                    >
                   send email
                    </Button>
           </form>
           </div> 
      </Container>

      </div> 
     );
}
 
export default PasswordReset;