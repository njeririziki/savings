import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Firebase from '../config';
import * as Icon from 'react-feather'
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  body:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
  
    position:'relative',
    width:200,
    height:200,
  },
  avatar:{
    marginLeft:theme.spacing(2),
    width:200,
    height:200,
    position:'relative',
    backgroundColor:'#005662'
  },
  progress:{
   position:"absolute",
   left:-6,
   zIndex:1,
   color:'black'
  },
  container:{
   alignSelf:'flex-end',
    position:'absolute',
    bottom:0
   
  },
  input:{
    width:0,
    height:0,
    opacity:0
  },
  fab:{
    backgroundColor:'#000000',
    alignSelf:'center',
    color:'#ffffff'
 },

}))

const UploadImage = () => {
   const classes= useStyles()
    const [file,setFile] = React.useState();
    const [imageUrl,setImageUrl] = React.useState(null)
    const [progress,setProgress] = React.useState();
    const [isloading,setIsLoading] =React.useState(false)
    const types =['images/png','image/jpeg'];
  
    const user= Firebase.auth().currentUser;
    const onFileChange= async(e) =>{
   
      const file= e.target.files[0];
     
        const storageRef = Firebase.storage().ref();
        const fileRef= storageRef.child(file.name);
       await fileRef.put(file).then('state_changed',(snap)=>{
          const progress =  (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log('Upload is' + progress + '% done');
        setProgress(progress)
       
        },(err)=> console.log (err));
        await fileRef.getDownloadURL()
        .then(async(downloadURl)=>{
          console.log ('File is available at', downloadURl);
          await user.updateProfile({
            photoURL: downloadURl
          })
        },(err)=> alert (err))

        }

    React.useEffect(()=>{
      const user= Firebase.auth().currentUser;
       if (user !=null){
         const imageUrl= user.photoURL
         setImageUrl(imageUrl)
       }
      },[])
    
    
    return ( 
      <div className={classes.body}>
         <Avatar
       className={classes.avatar}
       src={imageUrl} />
      
      
     <form className={classes.container}>
       <label>
       <input 
       type='file'
        onChange={onFileChange}
        className={classes.input}
        />
        <Icon.Camera/>
       
       </label>
     </form> 
      </div>   
     );
}
 
export default UploadImage;


/**   React.useEffect(()=>{

      const unsub= async()=>{
        const storageRef = Firebase.storage().ref();
        const fileRef= storageRef.child(file);
        await fileRef.getDownloadURL()
        .then(async(downloadURl)=>{
          console.log ('File is available at', downloadURl);
          await user.updateProfile({
            photoURL: downloadURl
          })
        })((err)=> alert (err))  
        
      }
      return ()=>unsub
    },[file]); 
    <CircularProgress
      className={classes.progress}
      variant='static'
      value={progress}/> */