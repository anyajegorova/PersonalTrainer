import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import dayjs from 'dayjs'

function Trainingslist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchTrainings();
    }, []
    );

    const handleClose = () => {
        setOpen(false);
    }


    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const getFullName = (url) => {
        return url.data.customer.firstname + ' ' + url.data.customer.lastname;
    }

    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Training deleted successfully');
                        setOpen(true);
                        fetchTrainings();
                    } else {
                        setMsg('Something went wrong')
                    }
                }).catch((err) => console.error(err))
        }
    }




    const columns = [
        { field: 'date', sortable: true, filter: true, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YY, H:mm') },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'customer', sortable: true, filter: true, valueGetter: getFullName },
        {
            headerName: "",
            width: 50,
            field: '_links.href',
            cellRendererFramework: params => <Stack direction="row" spacing={1}><IconButton aria-label="delete" color="error" size="small" onClick={() => deleteTraining(params.value)}><DeleteIcon /></IconButton></Stack>

        }


    ]
    return (<div>
        <div className="ag-theme-material" style={{ marginTop: 10, height: 700, width: '93%', margin: 'auto', paddingTop: 20 }}>
            <AgGridReact rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                animateRows={true}>
            </ AgGridReact >

        </div>

    </div>

    )


}
export default Trainingslist;