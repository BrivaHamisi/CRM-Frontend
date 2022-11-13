
// routes
import { useState,createContext } from 'react';

import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';



// ----------------------------------------------------------------------

const cors = require('cors')

export const ComplaintUpdateContext = createContext(null)

export default function App() {
  
  const [complaintUpdate, setComplaintUpdate] = useState(null)

  return (
    <ComplaintUpdateContext.Provider value={{complaintUpdate,setComplaintUpdate}}>
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
    </ComplaintUpdateContext.Provider>
  );
}
