import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Firebase from '../config';
import * as Icon from 'react-feather'
import { makeStyles } from '@material-ui/core/styles';

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
    //backgroundColor:'#005662'
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
    bottom:0,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'50px',
    height:'50px',
    borderRadius: '50%',
    backgroundColor:'#000000',
    color:'#ffffff'
   
  },
  editFab:{
  

  },
  input:{
    alignSelf:'center',
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
      const [imageUrl,setImageUrl] = React.useState(null)
      const [loading, setLoading] = React.useState(false)
      const [progress,setProgress] = React.useState(0)
    const types =['images/png','image/jpeg'];
  
    const user= Firebase.auth().currentUser;
    
    const onFileChange= async(e) =>{
      const file= e.target.files[0];
        const storageRef = Firebase.storage().ref();
        const fileRef= storageRef.child(file.name);
        fileRef.put(file).on('state_changed',(snap)=>{
          let progress =  (snap.bytesTransferred / snap.totalBytes) * 100;
          
        console.log('Upload is' + progress + '% done');
        },(err)=> console.log (err));

        await fileRef.getDownloadURL()
        .then(async(downloadURl)=>{
          console.log ('File is available at', downloadURl);
            await user.updateProfile({
              photoURL: downloadURl
            });
        },(err)=> alert (err))

        }

    React.useEffect(()=>{
      const user= Firebase.auth().currentUser;
       if (user !=null){
         const imageUrl= user.photoURL;
         setImageUrl(imageUrl);
       }
       return;
      },[])
    
    
    return ( 
      <div className={classes.body}>
       
         <Avatar
       className={classes.avatar}
       src={imageUrl} 
        />
  
     
      <form className={classes.container}>
       <label className={classes.editFab}>
       <input 
       type='file'
        onChange={onFileChange}
        className={classes.input}
        />
        <Icon.Edit2/>
       
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