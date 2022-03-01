import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";

const ViewUser = ({
  open,
  onClose,
  users: { id, email, name, phoneNumber, address, jobTitle, listId },
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>Information for {name}</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid spacing={2} container>
          <Grid item xs={6}>
            <Typography variant="h6" >Email:</Typography>
            <Typography variant="subtitle1" color="textPrimary">{email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="subtitle1" color="textPrimary" >{address ? address : "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Phone Number:</Typography>
            <Typography variant="subtitle1" color="textPrimary">{phoneNumber ? phoneNumber : "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Job Title:</Typography>
            <Typography variant="subtitle1" color="textPrimary">{jobTitle ? jobTitle : "N/A"}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

ViewUser.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  users: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    jobTitle: PropTypes.string,
    listId: PropTypes.number.isRequired,
  }),
};

export default ViewUser;
