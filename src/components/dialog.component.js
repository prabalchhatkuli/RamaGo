import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);

  const [day, setDay] = React.useState('');

  const handleChange =(event) => {
    setDay(event.target.value);
  };

  React.useEffect(() => {
    console.log('Do something after counter has changed', day);
 }, [day]);

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };

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
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
        <DialogContentText>
             Please choose a day and (optionally)a route.
        </DialogContentText>
          <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openSelect}
            onClose={handleCloseSelect}
            onOpen={handleOpen}
            value={day}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
             <MenuItem value={"Sunday"}>Sunday</MenuItem>
             <MenuItem value={"Monday"}>Monday</MenuItem>
             <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
             <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
             <MenuItem value={"Thursday"}>Thursday</MenuItem>
             <MenuItem value={"Friday"}>Friday</MenuItem>
             <MenuItem value={"Saturday"}>Saturday</MenuItem>
          </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}