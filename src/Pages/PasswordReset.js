import React from 'react';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Firebase from '../config'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import * as Icon from 'react-feather';
import Typography from '@material-ui/core/Typography';

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

const PasswordReset = (props) => {

    const classes =useStyle(); 

    const handleEmail= async(e)=>{
        e.preventDefault();
    const {email}  = e.target.elements;
      try{
        await Firebase.auth().sendPasswordResetEmail(email.value)
        .then(()=>{
        alert('A password reset link has been emailed to you');
        props.history.push('/login')
          }
         
         ).catch( (error)=> alert (error))
      } catch( error){
        alert(error)
    } 
         
    
}
    return ( 
       <div>
             <Container  maxWidth='xs'
            className={classes.container}
            >
                <div className={classes.root}>
               
                <Avatar
                className={classes.avatar}>
                <Icon.Send/>
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
                    helperText='A password reset link will be sent to this email address '
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