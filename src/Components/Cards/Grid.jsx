import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      //marginBottom:'10em'
    },
    paper: {
      display:'flex',
     // justifyContent:'space-between',
      height: 'auto',
      width: '300px',
      padding:'1em 0em 1em 2em'
    },
    paperDiv:{
      marginLeft:'1em'
    },
  typo:{
    fontSize:'2em',
    fontWeight:'400',
    color:'#007c91'
  },
  typoDesc:{
    fontSize:'1.5em',
    color:'#34515e',
  }
  }));
   const arr=[
     {key: 1, 
      text:'4K TV',
      description:'Saving Goal',
     icon:<Icon.Compass size='44px' color='#395C58'/> 
    },
    {key: 2,
        text:' 12,000',
        description:'Target Amount ',
        icon:<Icon.DollarSign size='44px' color='#00838f'/> },
    {key: 3,
          text:'360 days  ',
          description:'12 months left',
          icon:<Icon.Clock size='44px' color='#8D0E08'/> }
   ]


const DashGrid = () => {
    const classes = useStyles();
    return (  
        <Grid item xs>
        <Grid container justify='flex-start' spacing={5}>
          {arr.map((value) => (
            <Grid key={value.key} item>
              <Paper className={classes.paper} >
                
                {value.icon}
      
               
                <div className={classes.paperDiv}>
                <Typography className={classes.typo}>
                {value.text}
                </Typography>
                <Typography className={classes.typoDesc}>
                {value.description}
                </Typography>
                </div>

               
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
}
 
export default DashGrid;