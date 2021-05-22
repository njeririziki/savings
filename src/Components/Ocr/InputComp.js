import React, {useState} from 'react';
import * as Icon from 'react-feather'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Dropzone from 'react-dropzone'
import {createWorker} from "tesseract.js";

const useStyles = makeStyles(theme => ({
  root:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
     
  },
  container:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width: '500px',
    padding:'1em',
    backgroundColor:'#eaeaea',
    height:'200px',
    fontSize:'1.2em',
    border:'2px dashed #b0bec5',
    cursor:'pointer'
  },
  input:{
    width:0,
    height:0,
    opacity:0
  },
}))

const InputObj = () => {
    const classes= useStyles();
    const [text, setText] = useState();

    const worker = createWorker({
      logger: (m) => console.log(m),
  });
  
  const onImageUpload = async (imageUrl) => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
        data: {
            text
        },
    } = await worker.recognize(imageUrl);
    setText(text);
    console.log(text)
    await worker.terminate();
  };

    return ( 
        <div className={classes.root}>
      {/* <Box  className={classes.container} >
            <form >
       <label>
       <input 
       type='file'
        onChange={onImageUpload}
        className={classes.input}
        />
        <Icon.Camera/>
       
       </label>
     </form> 
     </Box>
    */}
     <Box  className={classes.container} >
     <Icon.Plus/>
     <Dropzone  
      onDrop={onImageUpload}>
        {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
     </Box>
   <p>This text is {text}</p>
        </div>
     );
}
 
export default InputObj;