import React from 'react';
import {Document,Page,Text,View, StyleSheet} from '@react-pdf/renderer'

const styles= StyleSheet.create({
    pgView:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'70px',
      padding:'10px'

    },
    fpg:{
        fontSize: "14pt",
    }
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
                <Text >
                           EVERYDIME MONTHLY REPORT
                        </Text>
                        <Text >
                           Goal : {props.goalTitle}
                        </Text>
                        <Text >
                            Target amount: {props.goalAmount} USD
                        </Text>
                        <Text >
                            Target time {props.goalTime} year 
                        </Text>
                        <Text >
                            You have  {props.goalTimeLeft} months to go to achieve it 
                        </Text>
                   
                </View>
            </Page>
          
            <Page 
            size='A4'>
                <View style={styles.pgView}>
               
                    
                <Text >
                        Saving transactions for {month} {year}
                    </Text>
                 
               {props.trans.map(p=> {
                  return(
                    <View >
                  <Text key={p.id} style={styles.fpg}>
                 Amount {p.amount} payed to savings account 
                  </Text>
                  <Text style={styles.fpg}>
                Transaction dates {p.day} at {p.time}
                  </Text>
                  </View>
                    ) 
               })}
                </View>
               
            </Page>
        </Document>
     );
}
 
export default PdfDoc;