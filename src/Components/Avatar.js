import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Firebase from '../config';


   
  
    // const showImage=()=>{
    //    Firebase.storage().ref('image')
    //     .child(image.name)
    //     .getDownloadURL()
    //     .then(url=>{
    //       setUrl(url);
    //     })
    
    // }
    
        // const handleUploadSuccess=(filename)=>{
        //     setImage(filename)
        //   Firebase.storage().ref('images').child(filename)
        //   .getDownloadURL()
        //   .then(url=> setUrl(url))
        //   }
        const types =['images/png','image/jpeg'];

    const Profile = () => {
        const [image,setImage] = React.useState(null)
         const [url,setUrl] = React.useState(null)

         const handleChange = (e)=>{
           let selected = e.target.files[0]
           if (selected && types.includes(selected.type)){
              setImage(selected)
           }else{
             setInterval(null);
             alert('your internet connection is slow please try again')
           }
         }
          React.useEffect(()=>{
            const uid = Firebase.auth().currentUser.uid
            const collectionRef = Firebase.firestore().collection('Users').doc(uid)
             if(image){ 
               const storage= Firebase.storage()
              const storageRef= storage.ref().child(image.name)
              const uploadTask = storageRef.put(image);
             
              const unsubscribe= uploadTask.on( 'state_changed',
                snapshot=>{
                  let percent = snapshot.bytesTransferred /
                  snapshot.totalBytes*100;
                  console.log(percent +'% done')
                  }, async ()=>{
                const url= await storageRef.getDownloadURL();
               
                   await collectionRef.set({
                    profile:url
                  })
                  console.log('this is me' + url)
                    setUrl(url);
                });
                
                 return ()=> unsubscribe;}
             
          },[image])
         
        return (
            <div>
             <Avatar>
              <input type='file' onChange={handleChange}/> 
             </Avatar>
             
            </div>
          );
    }
     
    export default Profile;