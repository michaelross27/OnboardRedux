import produce from "immer";
import { accessManagement as iam } from "../../utils/accessManagement";
import { LOGIN, LOGOUT, ALERT_ERROR_AUTH } from "../actionType";
import { successAlertFunction, rejectionReducer } from "./reducer-utils";
const initialState = {
    isSignedIn:
        iam.tokenType.get() !== null &&
        iam.token.get() !== null &&
        iam.userId.get() !== null &&
        iam.tenantReference.get() !== null,
    user: null,
    error: null,
    success: null,
    status: "idle",
};

const authReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            state.isSignedIn = true;
            state.user = action.payload;
            successAlertFunction(state, action);
            return state;
        case LOGOUT:
            state = initialState;
            return state;
        case ALERT_ERROR_AUTH:
            rejectionReducer(state, action);
            return state;
        default:
            return state;
    }
});

export default authReducer;
