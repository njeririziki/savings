import React from 'react' ;
import Firebase from '../config';
import UserProfile from '../Components/UserProfile'
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link,withRouter} from 'react-router-dom'
import * as Icon from 'react-feather';
import Home from '../Components/Home'
import {makeStyles} from '@material-ui/core/styles'
import Profile from '../Components/ImageUpload'

const useStyles = makeStyles( (theme) => ({
  root : {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center',
   
      marginTop:theme.spacing(8),
     
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
    alignSelf:'flex-end'
 },
 icon:{
     color:'#ffffff',
     
 },
}))
const User = () => {
    const classes= useStyles()
    const [open,setOpen]=React.useState(false);
    const [values,setValues] = React.useState({
      name :'',
      idno:'',
      phone:''
    })

  React.useEffect(()=>{
    const uid = Firebase.auth().currentUser.uid
    const unsub = Firebase.firestore().collection('Users').doc(uid)
    .get().then( (docsnapshot)=>{
      if(docsnapshot.exists) {
        Firebase.firestore().collection('Users').doc(uid)
        .onSnapshot((doc)=>{
          const goal = {
            name : doc.data().Name ,
            idno : doc.data().Idno ,
            phone: doc.data().Phone,
           profile: doc.data().Avatar }
            setValues(goal) 
        }) 
      } 
     
    })
    return ()=> unsub ;
    },[])

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
variant='h5'
>
{values.name? `Name: ${values.name }` :'Set your profile'}
</Typography>
<br/>
<Typography
variant='h5'
>
{values.idno? `idno: ${values.idno }` : ' '}
</Typography>
<br/>
<Typography
variant='h5'
>
{values.phone? `phone : ${values.phone }` : null}
</Typography>


<Fab
color='primary'
variant='round'
onClick={openModal}
className={classes.fab}
>
<Icon.Plus
className={classes.icon}
/>
</Fab> 
<br/>

<br/><br/>


< UserProfile
OnOpen={open}
OnClose={closeModal}/> 
<Button

component={Link} to={`/user/expense`}
>

</Button>

</div> 
  )
    return (
   <div  className={classes.root}>
   <Home
   Appbarname='User profile'
   Content={content}
   />
   </div>
      );
}
 
export default User ;

