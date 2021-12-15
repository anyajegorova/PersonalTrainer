import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Customerlist from './Customerlist';
import Trainingslist from './Trainingslist';



function TabMenu() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    }



    return (

        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} textColor="inherit" indicatorColor="secondary" aria-label="secondary tabs example" variant="fullWidth">
                    <Tab value="one" label="Customer" />
                    <Tab value="two" label="Trainings" />
                </Tabs>
            </AppBar>
            {value === "one" && <div><Customerlist /></div>}
            {value === "two" && <div><Trainingslist /></div>}
        </div>
    )
}

export default TabMenu;