import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        View Schedule By Day and Route
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">View Schedule By Day and Route</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose a day and (optionally)a route.
          </DialogContentText>
          {/* insert form information here */}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            // onChange={handleChange}
            >
            <MenuItem value={10}>Sunday</MenuItem>
            <MenuItem value={20}>Monday</MenuItem>
            <MenuItem value={30}>Tuesday</MenuItem>
            <MenuItem value={40}>Wednesday</MenuItem>
            <MenuItem value={50}>Thursday</MenuItem>
            <MenuItem value={60}>Friday</MenuItem>
            <MenuItem value={70}>Saturday</MenuItem>
            </Select>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Let's Go
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
