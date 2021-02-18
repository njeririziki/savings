import React from 'react';
import {Document,Page,Text,View, StyleSheet} from '@react-pdf/renderer'

const styles= StyleSheet.create({
    pgView:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'70px',
    },
    fpg:{
        fontSize: "20pt",
        padding:'5px',
        color:'#006978'
    },
    prpg:{
        fontSize: "13pt",
       marginLeft:"35px"
    },
    sepg:{
        fontSize: "10pt",
        paddingBottom:'10px',
        marginLeft:"35px"
    },
    head:{
        color:'#006978',
        fontSize: "15pt",
        padding:'10px',
        marginLeft:"20px"
    },
    transvw:{
       fontSize: "15pt",
       padding:'10px',
       marginLeft:"20px"
    },
    total:{
        fontSize: "13pt",
        padding:'5px',
        marginLeft:"40px",
        color:'#00701a'
    },
    pg2View:{
        display:'flex',
        flexDirection:'column',
        marginTop:'50px',
      },
})

const PdfDoc = (props) => {
    let date = new Date();
    const months =['Jan','Feb','Mar','Apr','May',
                     'Jun','Jul','Aug','Sept','Oct','Nov','Dec']
       let month = months[date.getMonth()]
       let year = date.getFullYear()
    return ( 
        <Document>
            <Page>
                <View style={styles.pgView}>
                <Text style={styles.fpg}>
                           EVERYDIME MONTHLY REPORT
                        </Text>
                        <Text style={styles.fpg}>
                           Goal : {props.goalTitle}
                        </Text>
                        <Text style={styles.fpg}>
                            Target amount:  {props.goalAmount} KES
                        </Text>
                        <Text style={styles.fpg} >
                            Target time: {props.goalTime} years 
                        </Text>
                       
                      
                   
                </View>
            </Page>
          
            <Page 
            size='A4'>
                <View style={styles.pg2View}>
               
                    
                <Text style={styles.head}>
                        Saving transactions for {month} {year}
                    </Text>
                 
               {props.trans.map(p=> {
                  return(
                    <View  key={p.id}style={styles.transvw}>
                  <Text style={styles.prpg}>
                 Amount $ {p.amount} payed to savings account 
                  </Text>
                  <Text  style={styles.sepg}>
                Transaction dates {p.day} at {p.time}
                  </Text>
                  </View>
                    ) 
               })}
                <Text style={styles.total}>
                $ {props.savings} total savings amount 
                        </Text>
                        <Text style={styles.total}>
                        {props.percentage} % of total amount covered 
                        </Text>
                        <Text style={styles.total}>
                        {props.goalTimeLeft} months left
                        </Text>
                       
                </View>
               
            </Page>
        </Document>
     );
}
 
export default PdfDoc;