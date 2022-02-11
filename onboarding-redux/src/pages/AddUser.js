import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Fab, CssBaseline } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

const FloatingActionButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const AddUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    jobTitle: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { name, email, address, phoneNumber, jobTitle } = state;

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Add User
      </Button> */}
      <FloatingActionButtonContainer>
          <Fab color="primary" onClick={handleClickOpen} >
            <AddIcon />
          </Fab>
        </FloatingActionButtonContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              value={name}
              type="text"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              value={email}
              type="email"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Address"
              variant="standard"
              value={address}
              type="text"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Phone Number"
              variant="standard"
              value={phoneNumber}
              type="number"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Job Title"
              variant="standard"
              value={jobTitle}
              type="text"
            />
            <br />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ width: "100px" }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Add
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Reset
          </Button>
          <Button
            color="secondary" variant="contained" type="submit"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUser;
