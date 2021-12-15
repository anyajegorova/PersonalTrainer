import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

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
            fetch('https://customerrest.herokuapp.com/api/trainings/' + url.data.id, { method: 'DELETE' })
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
        { field: 'date', sortable: true, filter: true, width: 350, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YY, H:mm') },
        { field: 'duration', sortable: true, filter: true, width: 250 },
        { field: 'activity', sortable: true, filter: true, width: 350 },
        { field: 'customer', sortable: true, filter: true, width: 350, valueGetter: getFullName },
        {
            headerName: "",
            width: 50,
            field: '_links.href',
            cellRendererFramework: params => <Stack direction="row" spacing={1}><IconButton aria-label="delete" color="error" size="small" onClick={() => deleteTraining(params)}><DeleteIcon /></IconButton></Stack>

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
        <Snackbar
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={handleClose}
        />
    </div>

    )


}
export default Trainingslist;