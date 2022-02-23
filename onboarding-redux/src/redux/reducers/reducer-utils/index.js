export const successAlertFunction = (state, action) => {
    if (state.error) state.error = null;
    state.success = {
        severity: "success", 
        message: action.payload.message,
        open: true, 
    };
    state.status = "success";
};

export const rejectionReducer = (state, action) => {
    if (state.success) state.success = null; 
    state.error = {
        severity: "error",
        message: action.payload,
        open: true,
    };
    state.status = "error";
};
