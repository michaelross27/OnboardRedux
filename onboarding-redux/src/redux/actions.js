import * as types from "./actionType";
import axios from "axios";
import { contactApi } from "./contactApi";

const url =
  "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/getAllUploadedEmails/listId/480";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,

})

export const loadUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}`
    );
    console.log("resp", response);
    dispatch(getUsers(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/${id}`
    );
    console.log("resp", response);
    dispatch(userDeleted());
    dispatch(loadUsers());
  } catch (error) {
    console.log(error);
  }
};
