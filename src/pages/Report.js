import React, { useState } from 'react';
import { Document, Page,Text,View , StyleSheet} from '@react-pdf/renderer';

export default function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
const styles = StyleSheet.create({
  title:{
    backgroundColor:""
  }
})

  return (
  
      <Document size={'A4'}>
        <Page>
        <View>
          {
            [3,5,1,4,14,4].map(each=><View><Text>{each}</Text></View>)
          }
          <Text>Hello</Text>
        </View>
        </Page>
      </Document>
     
  );
}

