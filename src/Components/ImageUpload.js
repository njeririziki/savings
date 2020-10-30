import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Firebase from '../config';
import * as Icon from 'react-feather'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar:{
    marginLeft:theme.spacing(2),
    width:200,
    height:200,
    alignSelf:'center'
  },
  container:{
    display:'flex',
    flexDirection:'row',
   

  }

}))

const UploadImage = () => {
   const classes= useStyles()
    const [fileUrl,setFileUrl] = React.useState();
  
    const onFileChange= async(e) =>{
      const file= e.target.files[0]
      const storageRef = Firebase.storage().ref();
      const fileRef= storageRef.child(file.name);
      await fileRef.put(file);
      setFileUrl (await fileRef.getDownloadURL());
      console.log ({fileUrl})
      if(fileUrl){
        const uid = Firebase.auth().currentUser.uid
     await Firebase.firestore().collection('Users').doc(uid).add({
          Avatar: fileUrl
        })}
    }
    
    
    return ( 
      <div>
         <Avatar
       className={classes.avatar}
       src={fileUrl}/>
      
       <div className={classes.container}>
     
     <Icon.Edit/>
     <input type='file' onChange={onFileChange}/>
      </div>
      </div>
 
    
     );
}
 
export default UploadImage;