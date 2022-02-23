import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({ root: { width: "100%" } }));
const CustomTextField = ({ input, label, meta, required, type, icon }) => {
    const classes = useStyles();
    const errorMessage = meta.error;
    const isTouched = meta.touched;
    return (
        <TextField
            {...input}
            error={isTouched && errorMessage ? true : false}
            required={required}
            label={label}
            placeholder={label}
            variant="outlined"
            helperText={isTouched && errorMessage ? errorMessage : ""}
            type={type}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{icon}</InputAdornment>
                ),
            }}
            className={classes.root}
        />
    );
};

export default CustomTextField;
