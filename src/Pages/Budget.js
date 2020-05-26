import React from 'react'
import Textfield from '@material-ui/core/TextField';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab';
import Firebase from '../config';
import Button from '@material-ui/core/Button'
import * as Icon from 'react-feather'
import BgModal from '../Components/BudgetInput';
import Home from '../Components/Home'
import {makeStyles} from '@material-ui/core/styles'

// interface BudgetArr {
//   category: string,
//   amount: number
// }
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
const Budget = () => {
  const classes = useStyles()
  const [openForm,setOpenForm]= React.useState(false);
  
  const [ values, setValues] = React.useState([])
   React.useEffect(()=>{
     const unsubscribe =  Firebase.firestore().collection('Goal')
      .onSnapshot((snapshot)=>{
        const budget = [] ;
        snapshot.docs.forEach(doc=>{
          budget.push({
            category: doc.data().Budget,
            amount: doc.data().Amount
          })
          setValues(budget)
        })
        
      })
      return()=>unsubscribe()
   },[values])
  
  const getData =()=>{
    setOpenForm(true)
  }
  const closeModal=()=>{
    setOpenForm(false)
  }
  const content=(
    <div className={classes.root}>
    <Fab color = 'primary'
    onClick={getData}>
    <Icon.Plus/>
    </Fab>
      
    <BgModal
    OnOpen={openForm}
    OnClose ={closeModal}
    />
    
    <List>
    {values.map( (item) =>(
      <ListItem 
      key={item}>
      <ListItemText primary ={item.category} 
      secondary= {item.amount}/>
      </ListItem>
      
       )) }
    
    </List>
   
   
       <Button 
          color='secondary'
          variant= 'contained'
          >
           Save
          </Button>

  </div>
  )
  
    return (
    <div >
    <Home
    Appbarname='Budget'
    Content={content}
    />
    </div>
      );
}
 
export default Budget;
