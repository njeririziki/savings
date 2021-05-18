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
          setLoading(true);
         setProgress (progress)
        console.log('Upload is' + progress + '% done');
        },(err)=> console.log (err));
        await fileRef.getDownloadURL()
        .then(async(downloadURl)=>{
          console.log ('File is available at', downloadURl);
          setImageUrl(downloadURl);
           setLoading(false)
          try{
            await user.updateProfile({
              photoURL: downloadURl
            });
          } catch (error){
            console.log(`Error occured updating url: ${error}`)
          }
         
        },(err)=> alert (err))

        }

    React.useEffect(()=>{
      const user= Firebase.auth().currentUser;
       if (user.photoURL !=null){
         const imageUrl= user.photoURL
         setImageUrl(imageUrl)
         console.log('found image URl')
       }
      },[imageUrl])
    
    
    return ( 
      <div className={classes.body}>
       
         <Avatar
       className={classes.avatar}
       src={imageUrl} 
       imgProp={
        loading? <CircularProgress
      variant="determinate" value={progress} /> :''
       } />
  
      
     <form >
       <label>
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