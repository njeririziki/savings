import React,{useEffect,useState, useRef} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=> ({
    page:{
    padding: theme.spacing(4),
    [theme.breakpoints.up('sm')]:{
        height: '40px',
        width:'200px'
    },
  
       }
        
    }))

    const PaypalFunc = ( props) => {
        const classes= useStyles()
        const [paidFor,setPaidFor]=useState(false);
        const [error,setError]= useState(null);
        const payPalRef= useRef();

        useEffect(()=>{
            window.paypal.Buttons({
                createOrder: (data,actions)=>{
                    return actions.order.create({
                        purchase_units:[
                            {
                                description:'savings',
                                amount:{
                                    currency_code:'USD',
                                    value: props.price,
                                },
                            },
                        ],
                    });
                },
              
                onApprove: async(data,actions)=>{
                    const order= await actions.order.capture();
                    setPaidFor(true);
                    console.log(order); 
                },
                onError:err =>{
                    setError(err);
                    console.error(err);
                }       
             })
             .render(payPalRef.current);
        },[]);
         
        if (paidFor) {
            return(
                <div className={classes.page}>
                         <Typography
                        variant='h5'
                        color='secondary'>
                         Transaction Successful!
                        </Typography>

                </div>
            )
        }
        return (  
            <div className={classes.page}>
                  {error && alert(`Error occured ${error.message}`)}
                <div ref={payPalRef}/>
            </div>
        );
    }
    
    
    
    export default PaypalFunc;