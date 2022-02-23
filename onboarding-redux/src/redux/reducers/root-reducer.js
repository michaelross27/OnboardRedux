import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import usersReducers from "./usersReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducers,
    form: reduxForm,

})

export default rootReducer;
