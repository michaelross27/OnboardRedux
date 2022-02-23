import React, { useState } from "react";
import { reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import WorkIcon from "@mui/icons-material/Work";
import PropTypes from "prop-types";
import { addUser } from "../redux/actions";
import { formStyles } from "./formStyle";

const FloatingActionButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const AddUser = (props) => {
  const { onClose, title } = props;

  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    jobTitle: "",
  });
  const [error, setError] = useState("");

  const [open, setOpen] = React.useState(false);

  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = formStyles();

  const { name, email, address, phoneNumber, jobTitle } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(state));
    setError("");
  };

  return (
    <div>
      <FloatingActionButtonContainer>
        <Fab color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </FloatingActionButtonContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Customer</DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogContent>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              name="name"
              type="text"
              required
              icon={<PersonOutlineIcon />}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              type="email"
              required
              icon={<EmailIcon />}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Address"
              variant="standard"
              name="address"
              type="text"
              icon={<HomeIcon />}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Phone Number"
              variant="standard"
              name="phoneNumber"
              type="tel"
              icon={<CallIcon />}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Job Title"
              variant="standard"
              name="jobTitle"
              type="text"
              icon={<WorkIcon />}
              onChange={handleInputChange}
            />
            <br />
          </DialogContent>
          <Divider />
          <DialogActions>
            <div className={classes.actions}>
              {" "}
              <Button
                style={{ width: "100px" }}
                color="primary"
                variant="contained"
                type="submit"
                onChange={handleInputChange}
                onClick={handleClose}
              >
                Add
              </Button>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

function validate(values) {
  const errors = {};
  const { email, name, phoneNumber } = values;
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const phoneNumberRegex = new RegExp(
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/g
  );
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!name) {
    errors.name = "Please enter your name.";
  }
  if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
    errors.phoneNumber = "The phone number entered is not valid.";
  }

  return errors;
}

AddUser.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: "addUser",
})(AddUser);
