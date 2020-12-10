import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {List,ListItem, ListItemText, Divider,ListItemIcon, IconButton,ListItemAvatar,ListSubheader} from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button  from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Box  from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Firebase from '../config';
import * as Icon from 'react-feather';
import Home from '../Components/Home'

const useStyles = makeStyles( (theme) => ({
    root : {
        display:'flex',
        flexDirection: 'row',
        marginTop:theme.spacing(15),
      
    },
    box:{
        width :'300px',
        height: '200px',
        display:'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignContent:'center',
        backgroundColor:'#ffffff',
        border:" solid 1px #b6b8c3",
        boxShadow:'2px 2px 2px 2px #e8eaf6',
        padding:theme.spacing(2),
       
  
    },
    container:{
     backgroundColor:'#ffffff',
     border:" solid 1px #b6b8c3",
     width: '700px',
     marginTop:theme.spacing(3),
  
  },
  download :{
      backgroundColor:'#b0003a',
     
  },
  link:{
      color: '#000000',
      textDecoration:'none'
  },
  header:{
      backgroundColor: '#0f1724',
      color: '#ffffff',
     
  }
  }
  ))

  const AdminPanel = () => {
      const classes = useStyles();
      const[details,setDetails]=useState([])
      const [selected ,setSelected] =useState()
  
      useEffect(() => {
        const userRef= Firebase.firestore().collection('UserDetails')
        const unsub= userRef.get().then((docSnapshot)=>{
          const details =[]
        
         docSnapshot.docs.forEach(doc=>{
                  const detailsaction= {
                      id:doc.id,
                      email: doc.data().email,
                      username: doc.data().username,
                      status: doc.data().status
                  } 
                  details.push(detailsaction)
                 })
               
                 setDetails(details)
                 console.log (details)
             })
             .catch((error)=>
        alert(error))
          return () => unsub
      }, [])
     
      const content=(
        <div className={classes.root}>
         <Container
          className={classes.container}>
              <Typography
              variant='h6'>
             Admin Panel 
              </Typography>
            <List>
                <ListSubheader >
                    <ListItemText
                    primary='User details'/>
                </ListSubheader>
              
            {details.map(p=>
                   
            <ListItem 
            key={p.id}
            >
             <ListItemAvatar>
                 <Avatar/>
             </ListItemAvatar>
            <ListItemText
            primary= {p.email}
            secondary={`${p.username} is ${p.status}`}
            
            />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"
                   >
                      <Icon.Voicemail />
                    </IconButton>
                  </ListItemSecondaryAction>
            <Divider/>
            </ListItem>
            )
            }   
            </List>
            </Container>   
        </div>
    )
      return ( 
          <div>
         <Home
        AppbarName='Admin Panel'
        Content={content}
        />

          </div>
       );
  }
   
  export default AdminPanel;
   /**  <ListItem
                className={classes.header}>
                    <ListItemIcon
                     className={classes.header}>
                     <Icon.User/>
                    </ListItemIcon>
                    <ListItemText
                    primary='User details'/>
                </ListItem> */