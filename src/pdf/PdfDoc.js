import React from 'react';
import {Document,Page,Text,View, StyleSheet} from '@react-pdf/renderer'

const styles= StyleSheet.create({
    fpg:{
        
        backgroundColor: 'tomato',
        color:'#ffffff'
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
            <Page 
            size='A4'>
                   <View >
                        <Text style={styles.fpg}>
                            Every Dime 
                        </Text>
                        <Text >
                        Transactions for {month} {year}
                    </Text>
                    </View>

            </Page>
            <Page 
            size='A4'>
                <View>
                 
               {props.trans.map(p=> {
                  return(
                    <View >
                  <Text key={p.id}>
                  Transaction Amount {p.amount} 
                  </Text>
                  <Text>
                  Created {p.day} at {p.time}
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