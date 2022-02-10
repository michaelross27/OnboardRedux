import * as types from "./actionType";
import axios from "axios";
import { contactApi } from "./contactApi";

const url =
  "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/getAllUploadedEmails/listId/480";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

export const loadUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/getAllUploadedEmails/listId/480",
      {
        headers: {
          Authorization:
            "Bearer ${eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWxpaC50ZXN0LmVtYWlsLjFAZ21haWwuY29tIiwiaWF0IjoxNjQ0MzU4MTYxLCJleHAiOjE2NDQ0NDQ1NjF9.JvlXOf50sxSZFMLPWD0JCGic8PFIQwHPO5e0jjOLlX4bjg3ZJ8eiNworw22fcQE1lihb8D2R4YvJ878YgTSPlA}",
        },
      }
    );
    console.log("resp", response);
    dispatch(getUsers(response.data));
  } catch (error) {
    console.log(error);
  }
};
