import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import WorkIcon from "@mui/icons-material/Work";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import CustomTextField from "../features/CustomTextField";
import { formStyles } from "./formStyle";

const UserForm = (props) => {
  const { open, onClose } = props;
  const classes = formStyles();
  const onSubmit = (formValues) => props.onSubmit(formValues);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter User Information</DialogTitle>
      <Divider />
      <form onSubmit={onSubmit} autoComplete="off">
        <DialogContent>
          <Grid spacing={2} container>
            <Grid item xs={6}>
              <Field
                label="Name"
                name="name"
                type="text"
                required
                component={CustomTextField}
                icon={<PersonOutlineIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Email"
                name="email"
                type="email"
                required
                component={CustomTextField}
                icon={<EmailIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Address"
                name="address"
                type="text"
                component={CustomTextField}
                icon={<HomeIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                component={CustomTextField}
                icon={<CallIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Job Title"
                name="jobTitle"
                type="text"
                component={CustomTextField}
                icon={<WorkIcon />}
              />
            </Grid>
          </Grid>
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
              onClick={props.handleSubmit(onSubmit)}
            >
              Submit
            </Button>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

UserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
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

export default reduxForm({
  validate,
  form: "userForm",
})(UserForm);
