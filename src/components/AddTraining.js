import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import AddCircleIcon from '@mui/icons-material/AddCircle';


function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(props.row.data.customer, training);
        handleClose();
    }

    const inputChanged = event => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Stack direction="row" spacing={1}><AddCircleIcon color="success" onClick={handleClickOpen} /></Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="date"
                        type="datetime-local"
                        value={training.date}
                        onChange={inputChanged}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        label="Duration(in minutes)"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining;