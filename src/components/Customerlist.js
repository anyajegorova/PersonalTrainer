import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer'
import AddTraining from './AddTraining';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        fetchCustomers();
    }, []
    );

    //Fetching data
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }


    // Add a new customer
    const addCustomer = customer => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => fetchCustomers(),
                setOpen(true),
                setMsg('Added successfully'))
            .catch(err => console.error(err));
    }

    // Delete existing customer 
    const deleteCustomer = url => {
        if (window.confirm('Are you sure?')) {
            fetch(url.data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        setOpen(true);
                        fetchCustomers();
                        setMsg("Deleted successfully")
                    } else {
                        setMsg("Something went wrong")
                    }
                })
                .catch(err => console.error(err));
        }
    };

    // Edit customer
    const editCustomer = (link, updatedCustomer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        })
            .then(response => {
                if (response.ok) {
                    setOpen(true)
                    fetchCustomers()
                    setMsg("Customer updated successfully")
                } else { setMsg("Something went wrong") }
            })
            .catch(err => console.error(err))
    }
    //Add new training
    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    setOpen(true)
                    fetchCustomers()
                    setMsg('Training added successfully')
                } else {
                    setMsg('Something went wrong')
                }

            })
            .catch((err) => console.error(err))
    }

    const columns = [
        { // Column for adding new training button
            headerName: "Add training",
            width: 50,
            field: '_links.href',
            cellRendererFramework: params => (
                <AddTraining addTraining={addTraining} row={params} />
            )
        },
        { field: 'firstname', sortable: true, filter: true, width: 150 },
        { field: 'lastname', sortable: true, filter: true, width: 150 },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 120 },
        { field: 'city', sortable: true, filter: true, width: 120 },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        ,
        {   //Column for edit customer button
            headerName: "",
            width: 50,
            field: 'links.0.href',
            cellRendererFramework: params => (
                <EditCustomer editCustomer={editCustomer} row={params} />
            )



        },
        {   //Column for deleting customer button
            headerName: "",
            width: 50,
            field: '_links.href',
            cellRendererFramework: params => <Stack direction="row" spacing={1}><IconButton aria-label="delete" color="error" size="small" onClick={() => deleteCustomer(params)}><DeleteIcon /></IconButton></Stack>

        }

    ]
    return (<div>
        <AddCustomer addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{ marginTop: 10, height: 620, width: '93%', margin: 'auto' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                animateRows={true}
            />
        </div>
        <Snackbar
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={handleClose}
        />
    </div>

    )


}
export default Customerlist;