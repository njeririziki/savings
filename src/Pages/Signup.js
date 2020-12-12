import React, {useContext,useEffect} from 'react'
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
import Firebase from '../config';


const useStyle= makeStyles(theme=>({


root:{
    marginTop: theme.spacing(8),
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    
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
submit:{
marginTop:theme.spacing(5),
alignSelf:'center',
backgroundColor:'#000000',
fontFamily:'Titillium Web',
color:'#ffffff',
fontSize:20
}
}))
 


const SignUp = ({history}) => {
    const classes =useStyle()
    const [email,setEmail]= React.useState()
    const [password0,setPassword0]= React.useState()
    const [password,setPassword]= React.useState()
    const [showPassword,setShowPassword] = React.useState(false)
    const [valid,setValid] = React.useState(true)
    const [error,setError] = React.useState(false)
    const [adminRole,setAdminRole]= React.useState(false)


    // const changeRole=(e)=>{
    //     e.preventDefault();
    //     const email= e.target.value
    //     if ( email === 'admin@edime.com'){
    //       return setAdminRole(true)
    //       }
    // }
    
    const revPassword=()=>{
        setShowPassword(!showPassword)
    }
    const submitInput = async (event)=>{
        event.preventDefault();
        const { name, email ,password } = event.target.elements;
      
       try {
           await  Firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
           . then( 
            (user)=> {
                if ( user.email === 'admin1@edime.com'){
                return (
                   history.push("/adminpanel")
                   )
                
                }else{
                   return history.push('/goals')
                }
        
             } ).catch((error)=>  alert (error))
           const user = Firebase.auth().currentUser;
           await Firebase.firestore().collection('Goal').doc(user.uid).set(
              {
                  Savings:0
             } 
           )
           await user.updateProfile({
             displayName : name.value ,
             }).catch((error)=> alert(error))
             await Firebase.firestore().collection('UserDetails').doc(user.uid).set({
                email: user.email,
                username:user.displayName,
                status: 'active',
                isAdmin: 'user'
            }).catch( (error)=> alert (error))
       } catch( error){
           alert(error)
       }     
        } 

//       useEffect(() => {
//         const unsub =  async()=> {
//             Firebase.auth().onAuthStateChanged(setAdminRole(true))
//             try {
//                 if (adminRole){
//                     const user = Firebase.auth().currentUser;
//                     if ( user.email === 'admin1@edime.com'){
//                         return await Firebase.firestore().collection('UserDetails').doc(user.uid).set({
//                           email: user.email,
//                           username:user.displayName,
//                           status: 'active',
//                           isAdmin: true
//                       }).catch( (error)=> alert (error))
//                } 
//                await Firebase.firestore().collection('UserDetails').doc(user.uid).set({
//                 email: user.email,
//                 username:user.displayName,
//                 status: 'active',
//                 isAdmin: false
//             }).catch( (error)=> alert (error))
//             }
//             }catch(error){ alert (error)}   
//     }
//     return()=> unsub
// },[adminRole])
  
//   useEffect(() => {
//     if(password0 === "") {
//      return setError(false)
//     } else if (password0 < 8){
//       return  setError(false)
//     }
//     else if(password !== password0) {
//         return setError(false) && setValid(false);
       
//     }else {
//        return setError(true)
//     }
//   }, [password,password0])

  const validatePassword =async(event)=>{
      event.preventDefault()
      const pass= event.target.value
      const reg = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$")
      const validate= reg.test(pass)
      if (!validate){
        setError(true);
        setValid(false)
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
                <Icon.UserPlus/>
                </Avatar>
                
                <form
                 onSubmit = {submitInput}
                 className={classes.other}>
                       <Textfield
                    variant='outlined'
                    name='name'
                    type = 'text'
                    placeholder='John Doe'
                    required
                    label='Username'
                    fullWidth
                     onChange={(e)=>{
                         setEmail(e.target.value)
                     }}
                    helperText='This field is compulsory. Please provide. '
                    className={classes.other} 
                    />
                    <Textfield
                    variant='outlined'
                    name='email'
                    type = 'email'
                    placeholder='person@gmail.com'
                    required
                    label='email'
                    fullWidth
                    helperText='The email is compulsory and must be valid.'
                    className={classes.other} 
                    />
                    <Textfield
                    variant='outlined'
                    name='password' 
                    type = {showPassword? 'text':'password'}
                    placeholder='$CT67!gU'
                    label='password'
                    onChange={(e)=>{
                        const val = e.target.value
                        setPassword(val)
                    }}
                    error={error}
                    helperText={error?'Mix letters and symbols to make a strong password':
                    'Compulsory. Use 8 or more characters with a mix of letters, numbers & symbols'}
                    fullWidth
                    required
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
                    onChange={  validatePassword }
                       
                    
                    error={error}
                    required
                    className={classes.other}
                    helperText= {error? "Please confirm password"
                        :'Compulsory. Confirm password'}
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
                    <Button
                    className={classes.submit}
                    variant='contained'
                    type = 'submit'
                    fullWidth
                   disabled={valid}
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