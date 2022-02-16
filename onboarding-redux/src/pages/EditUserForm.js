import React from "react";
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Button,
    Grid,
    Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import WorkIcon from "@mui/icons-material/Work";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { formStyles } from "./formStyle"

const EditForm = (props) => {
    const { open, onClose, title } = props;
    const classes = formStyles();
    const onSubmit = (formValues) => props.onSubmit(formValues);
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="contact-form-title"
            aria-describedby="contact-form"
        >
            <DialogTitle id="contact-form-title">{title}</DialogTitle>
            <Divider />
            <form onSubmit={onSubmit} autoComplete="off">
                <DialogContent>
                    <Grid
                        container
                        spacing={3}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={12} container>
                            <Field
                                name="name"
                                type="text"
                                label="Full Name"
                                required
                                icon={<PersonOutlineIcon />}
                            />
                        </Grid>
                        <Grid item xs={12} container>
                            <Field
                                name="email"
                                type="email"
                                label="Email"
                                required
                                icon={<EmailIcon />}
                            />
                        </Grid>
                        <Grid item xs={12} container>
                            <Field
                                name="address"
                                type="text"
                                label="Home Address"
                                icon={<HomeIcon />}
                            />
                        </Grid>
                        <Grid item xs={6} container>
                            <Field
                                name="phoneNumber"
                                type="tel"
                                label="Phone Number"
                                icon={<CallIcon />}
                            />
                        </Grid>
                        <Grid item xs={6} container>
                            <Field
                                name="jobTitle"
                                type="text"
                                label="Job Title"
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
                            variant="contained"
                            color="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={props.handleSubmit(onSubmit)}
                        >
                            Submit
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

EditForm.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
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

    // email must be provided and must be a valid email
    if (!email || !emailRegex.test(email)) {
        errors.email = "A valid email must be provided.";
    }

    // name field must be provided
    if (!name) {
        errors.name = "You must enter a name.";
    }
    // this logic has purpose so that either you leave phone number empty or enter a valid working phone number
    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
        errors.phoneNumber = "A valid working phone number must be provided.";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "contactForm",
})(EditForm);
