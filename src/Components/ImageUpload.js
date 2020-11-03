import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Firebase from '../config';
import * as Icon from 'react-feather'
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip'
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
    const [fileUrl,setFileUrl] = React.useState();
    const [imageUrl,setImageUrl] = React.useState(null)
    const types =['images/png','image/jpeg'];
  
    const onFileChange= async(e) =>{
      
      const file= e.target.files[0]
      if (file && types.includes(file.type)){
        const storageRef = Firebase.storage().ref();
        const fileRef= storageRef.child(file.name);
        await fileRef.put(file);
        setFileUrl (await fileRef.getDownloadURL());
        console.log (fileUrl)
        if(fileUrl){
          const uid = Firebase.auth().currentUser.uid
       await Firebase.firestore().collection('Users').doc(uid).set({
            Avatar: fileUrl
          },{merge:true}
          )}
     } else{
      alert('Your internet connection is slow please try again')
    }
      
    }
    React.useEffect(()=>{
      const uid = Firebase.auth().currentUser.uid
      const unsub = Firebase.firestore().collection('Users').doc(uid)
      .get().then( (docsnapshot)=>{
        if(docsnapshot.exists) {
          Firebase.firestore().collection('Users').doc(uid)
          .onSnapshot((doc)=>{
            setImageUrl(doc.data().Avatar)
          }) 
        } 
       
      })
      return ()=> unsub ;
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