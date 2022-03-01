import * as types from "./actionType";
import { contactApi } from "./contactApi";
import { formValues, reset } from "redux-form";
import { accessManagement as iam } from "../utils/accessManagement";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
  message: "SUCCESS: Users have been fetched",
});

const userDeleted = (userIds) => ({
  type: types.DELETE_USER,
  payload: {
    data: userIds,
    message: `SUCCESS: Successfully deleted ${userIds.length} contacts`,
},

});

const userAdded = () => ({
  type: types.ADD_USER,
});

const userUpdated = () => ({
  type: types.UPDATE_USER,
  payload: formValues,
});

const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

export const loadUsers = () => async (dispatch) => {
  try {
    const response = await contactApi.get("/getAllUploadedEmails/listId/480");
    const contacts = response.data;
        contacts.reverse();

    dispatch(getUsers(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (userIds) => async (dispatch) => {
  try {
    await contactApi.delete("/deleteEmails", {
      data: userIds,
    }); 
    dispatch(userDeleted(userIds));
    dispatch(loadUsers());
  } catch (error) {
    console.log(error);
  }
};

export const addUser = (formValues) => async (dispatch) => {
  dispatch(reset("addUser"));
  try {
    await contactApi.post("/emailUpload", [
        {
            ...formValues,
            listId: 480,
        },
    ]);
    await contactApi.get("/getAllUploadedEmails/listId/480");
    dispatch(userAdded());
        dispatch(loadUsers());
    } catch (error) {
      console.log(error);
    }
};

export const updateUser = (formValues) => async (dispatch) => {
  try {
    await contactApi.put(
      "/updateEmail",
      formValues
    );
    dispatch(userUpdated());
    dispatch(loadUsers());
  } catch (error) {
    console.log(error);
  }
};

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
                type: types.LOGIN,
                payload: { data: userDetails, message: "Successfully Login" },
            });
            navigate("/contacts");
        } catch (err) {
            dispatch({
                type: types.ALERT_ERROR_AUTH,
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
                type: types.LOGIN,
                payload: { data: userDetails, message: "Successfully Login" },
            });

            navigate("/home");
            return;
        } catch (err) {
            dispatch({
                type: types.ALERT_ERROR_AUTH,
                payload: "ERROR: Unable to Login",
            });
        }
    }
    navigate("/");
};

export const logout = (navigate) => (dispatch) => {
    iam.removeAll();
    dispatch({ type: types.LOGOUT });
    navigate("/");
};

export const setUserDetails = (user) => (dispatch) =>
    dispatch({ type: types.SET_USER_DETAILS, payload: user });

export const cleanUserDetails = () => (dispatch) =>
    dispatch({ type: types.CLEAN_USER_DETAILS });

export const cleanUser = () => (dispatch) =>
    dispatch({ type: types.CLEAN_USER });

