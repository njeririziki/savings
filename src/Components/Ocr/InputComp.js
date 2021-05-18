import React from 'react';
import * as Icon from 'react-feather'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:'500px',
      height:'500px'
  }
}))

const InputObj = () => {
    const classes= useStyles()
    const onImageUpload=()=>{

    }
    return ( 
        <div className={classes.root}>
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
        </div>
     );
}
 
export default InputObj;