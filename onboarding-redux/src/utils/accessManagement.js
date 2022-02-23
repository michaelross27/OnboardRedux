const TOKEN_TYPE_KEY = "react-task-tokenType";
const USER_ID_KEY = "react-task-userId";
const ACCESS_TOKEN_KEY = "react-task-accessToken";
const TENANT_ID_KEY = "react-task-tenantId";
const TENANT_REFERENCE_KEY = "react-task-tenantReference";
export const accessManagement = {
    tokenType: {
        set: (tokenType) =>
            window.localStorage.setItem(TOKEN_TYPE_KEY, tokenType),
        get: () => window.localStorage.getItem(TOKEN_TYPE_KEY),
    },
    userId: {
        set: (userId) => window.localStorage.setItem(USER_ID_KEY, userId),
        get: () => window.localStorage.getItem(USER_ID_KEY),
    },
    token: {
        set: (accessToken) =>
            window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken),
        get: () => window.localStorage.getItem(ACCESS_TOKEN_KEY),
    },
    tenantId: {
        set: (tenantId) => window.localStorage.setItem(TENANT_ID_KEY, tenantId),
        get: () => window.localStorage.getItem(TENANT_ID_KEY),
    },
    tenantReference: {
        set: (tenantReference) =>
            window.localStorage.setItem(TENANT_REFERENCE_KEY, tenantReference),
        get: () => window.localStorage.getItem(TENANT_REFERENCE_KEY),
    },
    removeAll: () => {
        window.localStorage.removeItem(TOKEN_TYPE_KEY);
        window.localStorage.removeItem(USER_ID_KEY);
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(TENANT_ID_KEY);
        window.localStorage.removeItem(TENANT_REFERENCE_KEY);
    },
};
