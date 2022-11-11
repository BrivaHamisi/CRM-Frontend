import { useState, useEffect, useCallback, createContext } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import API , { getConfig }from './API';

// material

// components
import Page from '../components/Page';
import { ProductSort, ProductFilterSidebar } from '../sections/@dashboard/products';
import CustomizedSteppers from '../sections/@dashboard/products/CustomizedSteppers';
// import MyComplaints from '../sections/@dashboard/blog';
import { MyComplaints } from '../sections/@dashboard/blog';


// ----------------------------------------------------------------------
export const ComplaintContext = createContext(null)

export default function EcommerceShop() {
  const [complaints, setComplaints] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [editComplaints, setEditComplaints] = useState([null]);

  
  

  const editBtn = (complaints) => {
    editComplaints(complaints);
  };

  const getComplaints = useCallback(async () => {
    const config = await getConfig();
    API.get('/api/complaints/?current_user=true', config)
      .then((res) => {
        setComplaints(res.data ?? []);
        setComplaint(res.data[res.data.length-1])
        // console.log(data)

      })
      .catch((err) => {
        console.log(err?.response?.data || err?.response || err);
      });
  }, []);

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [complaint, setComplaint] = useState(null)
  return (
    <ComplaintContext.Provider value={{complaint, setComplaint}}>
    <Page title="Dashboard: Complaints Status">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Track Complain Status
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <CustomizedSteppers complaint={complaint}/>
        <MyComplaints complaints={complaints}/>
       
      </Container>
    </Page>
    </ComplaintContext.Provider>
  );
}
