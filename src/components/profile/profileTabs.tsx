"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from './profileTabPanel';
import MyPosts from './myPosts';
import MyApplications from './myApplications';
import PaginationContainer from '../paginationContainer';
import MyFavorites from './myFavorites';

function ProfileTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }} className='rounded-xl pb-4 px-4'>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Posts" />
        <Tab label="applications" />
        <Tab label="favourites" />
        <Tab label="settings" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <MyPosts />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyApplications />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MyFavorites />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        settings
      </CustomTabPanel>
    </Box>
  );
}

export default ProfileTabs