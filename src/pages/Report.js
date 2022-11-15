import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function MyApp() {
  const [filterName, setFilterName] = useState('');

  // Fetching the Feedbacks from the API
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const fetchFeedback = async () => {
      const fetchReq = await fetch('http://127.0.0.1:8000/api/feedbacks/?user=True', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await fetchReq.json();
      setFeedbacks(result);
      console.log('Result', result);
    };

    fetchFeedback();
  }, []);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const styles = StyleSheet.create({
    title: {
      backgroundColor: '',
    },
  });

  return (
    <Document size={'A4'}>
      <Page>
        <View>
          {feedbacks.map((each) => (
            <View>
              <Text>{each.action_taken}</Text>
            </View>
          ))}
          <Text>Hello</Text>
        </View>
      </Page>
    </Document>
  );
}
