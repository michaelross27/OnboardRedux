import React, { useState, useEffect } from "react";
import { Form, Field, reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import { formStyles } from "./formStyle";
import { addUser, updateUser, getSingleUser } from "../redux/actions";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const EditUser = (props) => {
  const { onClose, title } = props;

  const classes = formStyles();

  /*   const { users } = useSelector((state) => state.data);
  const { user } = useSelector((state) => state.data); */

  const handleClickOpen = () => {
    setOpen(true);
  };

  /*   useEffect(() => {
    dispatch(getSingleUser(id));
  }, []); */

  /*   useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]); */

  const onSubmit = (formValues) => props.onSubmit(formValues);
  let dispatch = useDispatch();

  let { id } = useParams;

  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    jobTitle: "",
  });

  const { name, email, address, phoneNumber, jobTitle } = state;

  const [error, setError] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(state, id));
    setError("");
  };

  return (
    <div>
      <h2>Update Customer</h2>
      <form onSubmit={handleSubmit} onClose={handleClose} autoComplete="off">
        <Field
          id="standard-basic"
          label="Name"
          variant="standard"
          name="name"
          type="text"
          required
          component={renderField}
          icon={<PersonOutlineIcon />}
          onChange={handleInputChange}
        />
        <br />
        <Field
          id="standard-basic"
          label="Email"
          variant="standard"
          name="email"
          type="email"
          required
          component={renderField}
          icon={<EmailIcon />}
          onChange={handleInputChange}
        />
        <br />
        <Field
          id="standard-basic"
          label="Address"
          variant="standard"
          name="address"
          type="text"
          component={renderField}
          icon={<HomeIcon />}
          onChange={handleInputChange}
        />
        <br />
        <Field
          id="standard-basic"
          label="Phone Number"
          variant="standard"
          name="phoneNumber"
          type="tel"
          component={renderField}
          icon={<CallIcon />}
          onChange={handleInputChange}
        />
        <br />
        <Field
          id="standard-basic"
          label="Job Title"
          variant="standard"
          name="jobTitle"
          type="text"
          component={renderField}
          icon={<WorkIcon />}
          onChange={handleInputChange}
        />
        <br />
      </form>
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

/* EditUser.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}; */

export default reduxForm({
  validate,
  form: "editUser",
})(EditUser);
