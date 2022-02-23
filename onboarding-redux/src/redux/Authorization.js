import { reset } from "redux-form";
import { LOGIN, LOGOUT, ALERT_ERROR_AUTH } from "./actionType";
import { contactApi } from "../../api";
import { accessManagement as iam } from "../utils/accessManagement";

export const login =
    ({ formValues, navigate }) =>
    async (dispatch) => {
        try {
            const res = await contactApi.post("/auth/signin", formValues);
            const { tokenType, accessToken, id } = res.data;
            iam.tokenType.set(tokenType);
            iam.token.set(accessToken); 
            iam.userId.set(id); 

            const userRes = await contactApi.get(`/getUserState/id/${id}`);
            const userDetails = userRes.data.data;
            const { tenantReference } = userDetails;

            iam.tenantReference.set(tenantReference); 
            dispatch(reset("loginForm"));
            dispatch({
                type: LOGIN,
                payload: { data: userDetails, message: "Successfully Login" },
            });
            navigate("/contacts");
        } catch (err) {
            dispatch({
                type: ALERT_ERROR_AUTH,
                payload: "ERROR: Unable to Login",
            });
        }
    };

export const getCurrentUser = (navigate) => async (dispatch, getState) => {
    const isAutoLogin = getState().auth.isSignedIn;

    if (isAutoLogin) {
        try {
            const res = await contactApi.get(
                `/getUserState/id/${iam.userId.get()}`
            );
            const userDetails = res.data.data;
            dispatch({
                type: LOGIN,
                payload: { data: userDetails, message: "Successfully Login" },
            });

            navigate("/home");
            return;
        } catch (err) {
            dispatch({
                type: ALERT_ERROR_AUTH,
                payload: "ERROR: Unable to Login",
            });
        }
    }
    navigate("/");
};

export const logout = (navigate) => (dispatch) => {
    iam.removeAll();
    dispatch({ type: LOGOUT });
    navigate("/");
};
