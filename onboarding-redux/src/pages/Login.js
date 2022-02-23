import React, { useEffect } from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import { Container } from "../features/styled-components";
import { useActions } from "../redux/useActions";
const useStyles = makeStyles((theme) => ({ loginCard: { width: "500px" } }));


const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { login, getCurrentUser } = useActions();
    const handleLogin = (formValues) => {
        login({ formValues, navigate });
    };

    useEffect(() => {
        getCurrentUser(navigate);
    }, [getCurrentUser, navigate]);
    return (
        <Container>
            <Card className={classes.loginCard}>
                <CardContent>
                    <Typography variant="h5" align="center">
                        Login
                    </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <LoginForm onSubmit={handleLogin} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
