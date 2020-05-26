import React from 'react' ;
import Firebase from '../config';
import UserProfile from '../Components/UserProfile'
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link,withRouter} from 'react-router-dom'
import * as Icon from 'react-feather';
import Home from '../Components/Home'
const User = () => {
    
    const [open,setOpen]=React.useState(false);
    const [values,setValues] = React.useState({
        name:'',
        idno:'',
        phone:''
  })
  const [image,setImage] = React.useState([]);
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
    React.useEffect(()=>{
      const handleChange =()=>{
       
        const storage= Firebase.storage()
        const storageRef= storage.ref(`Image/${image.name}`)
        const uploadTask = storageRef.put(image);
       
        const unsubscribe= uploadTask.on( 'state_changed',
          snapshot=>{
            let percent = snapshot.bytesTransferred /
            snapshot.totalBytes*100;
            console.log(percent +'% done')
          },
          ()=>{
            storage().ref('image')
            .child(image.name)
            .getDownloadURL()
            .then(url=>{
              setUrl(url);
          });
          }
            );
            unsubscribe();
    }   
    return ()=>handleChange()
    },[image])
   
     
    
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
<input type = 'file' name ='image'
onChange={(e)=>
setImage(e.target.files[0])}/>
<br/><br/>

  <Fab
color='primary'
variant='round'

>
<Icon.Plus
/>
</Fab> 
<Button
variant='contained'
color='secondary'
>
 open Image
</Button>
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
   <div>
   <Home
   Appbarname='User profile'
   Content={content}
   />
   </div>
      );
}
 
export default User ;

