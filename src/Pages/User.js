import React from 'react' ;
import Firebase from '../config';
import UserProfile from '../Components/UserProfile'
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link,withRouter} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import * as Icon from 'react-feather';
import Home from '../Components/Home'
import {makeStyles} from '@material-ui/core/styles'
import Profile from '../Components/ImageUpload';


const useStyles = makeStyles( (theme) => ({
  content:{
    marginTop:theme.spacing(15),
   
 },
  root : {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center',
     
  },
  table:{
      width : 460
  },
  avatar:{
   alignSelf:'center',
   height:400,
   width:400
  },
  fab:{
    backgroundColor:'#000000',
    color:'#ffffff',
   
 },
 delfab:{
  backgroundColor:'#c62828',
  color:'#ffffff',
   width:'300px'
},
typo:{
  display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    }
},
 icon:{
     color:'#ab000d',
     
 },
}))
const User = () => {
    const classes= useStyles()
    const [open,setOpen]=React.useState(false);
    const [values,setValues] = React.useState({
      name:'',
      email:''
    })

  React.useEffect(()=>{
    const user = Firebase.auth().currentUser
    if(user !=null){
       const profile = {
         name:user.displayName,
         email:user.email
       }

       setValues(profile)

    }
 
    /*const unsub = Firebase.firestore().collection('Users').doc(uid)
    .get().then( (docsnapshot)=>{
      if(docsnapshot.exists) {
        Firebase.firestore().collection('Users').doc(uid)
        .onSnapshot((doc)=>{
          const goal = {
            name : doc.data().Name ,
            idno : doc.data().Idno ,
           profile: doc.data().Avatar }
            setValues(goal) 
        }) 
      } 
     
    })   return ()=> unsub ;*/
  
    },[])
    const delaccount =()=>{
      const user = Firebase.auth().currentUser
      user.delete().then(
        Firebase.auth().signOut()
      )

    }
    const openModal=()=>{
       setOpen(true)
    }
    const closeModal=()=>{
       setOpen(false)
    }
  
  const content =(

    <div className={classes.root}>
    <Profile className={classes.avatar}/>
<br/> <br/>

<Typography
variant='body1'
>
{values.name? `Name: ${values.name }` :null}
</Typography>
<br/>
<div className={classes.typo}>
<Icon.Mail/>
<Typography
variant='body1'
>
 {values.email? `${values.email}`  :null}
</Typography>
</div>

<br/>
<div className={classes.typo}>
<Icon.AlertCircle/>
<Typography
variant='body1'

>
 Personal Information 
 </Typography>
<Tooltip title='Reset password'>
<Fab
variant='round'
onClick={openModal}
className={classes.fab}
>
<Icon.Edit2/>
</Fab>
</Tooltip>


</div>


<br/><br/>
<div className={classes.typo}>
<Icon.AlertTriangle
  className={classes.icon}/>
  <Typography
variant='body1'
>
Deleting your account will permanently erase your information
</Typography>
</div>
<br/>
<Tooltip title='This will erase everything'>
<Fab
variant='extended'
onClick={delaccount}
className={classes.delfab}
>
<Icon.Trash/>
Delete Account
</Fab>
</Tooltip>


< UserProfile
OnOpen={open}
OnClose={closeModal}/> 

</div> 
  )
    return (
   <div   className={classes.content}>
   <Home
   Appbarname='User profile'
   Content={content}
   />
   </div>
      );
}
 
export default User ;

