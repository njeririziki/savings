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
import FileUploader from 'react-firebase-file-uploader'

const useStyles = makeStyles( (theme) => ({
  root : {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignContent:'center',
      marginTop:theme.spacing(15),
     
  },
  table:{
      width : 460
  }
}))
const User = () => {
    const classes= useStyles()
    const [open,setOpen]=React.useState(false);
    const [values,setValues] = React.useState({
        name:'',
        idno:'',
        phone:''
  })
  const [image,setImage] = React.useState();
  const [url,setUrl] = React.useState(null)
  React.useEffect(()=>{
    const goal={
        name:'',
        idno:'',
        phone:''}
    const unsub = Firebase.firestore().collection('Goal').doc('userdets').onSnapshot(doc=>{
               goal.name=doc.data().username
                goal.idno=doc.data().useridno
               goal.phone = doc.data().userphone
               setValues(goal) 
      })
    
      
          return ()=>unsub()
    },[])

    const openModal=()=>{
       setOpen(true)
    }
    const closeModal=()=>{
       setOpen(false)
    }
    const handleUploadSuccess=(filename)=>{
      setImage(filename)
    Firebase.storage().ref('images').child(filename)
    .getDownloadURL()
    .then(url=> setUrl(url))
    }
    // React.useEffect(()=>{
    //   const handleChange =()=>{
       
    //     const storage= Firebase.storage()
    //     const storageRef= storage.ref(`Image/${image}`)
    //     const uploadTask = storageRef.put(image);
       
    //     const unsubscribe= uploadTask.on( 'state_changed',
    //       snapshot=>{
    //         let percent = snapshot.bytesTransferred /
    //         snapshot.totalBytes*100;
    //         console.log(percent +'% done')
    //       },
    //       ()=>{
    //         storage().ref('image')
    //         .child(image)
    //         .getDownloadURL()
    //         .then(url=>{
    //           setUrl(url);
    //       });
    //       }
    //         );
    //         unsubscribe();
    // }   
    // return ()=>handleChange()
    // })
   
     
    
      // const showImage=()=>{
      //    Firebase.storage().ref('image')
      //     .child(image.name)
      //     .getDownloadURL()
      //     .then(url=>{
      //       setUrl(url);
      //     })
      
      // }
  const content =(
    <div>
    <Typography
variant='h5'
>
{values.name? `Name: ${values.name }` :'Set your goal'}
</Typography>
<br/>
<Typography
variant='h5'
>
{values.idno? `idno: ${values.idno }` : 'nothing'}
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
>
<Icon.Plus
/>
</Fab> 
<br/>
<FileUploader
           accept = 'image/*'
           name='profile'
          storageRef={Firebase.storage().ref('images')}
          onUploadError={console.log('Error')}
          onUploadSuccess={handleUploadSuccess}
            />
<br/><br/>
 

<br/> <br/>
<img src= {url} alt='profile'/>
< UserProfile
OnOpen={open}
OnClose={closeModal}/> 
<Button
component={Link} to={`/user/expense`}
>
Expense
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

