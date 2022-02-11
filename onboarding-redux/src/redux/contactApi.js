import axios from "axios";

export const contactApi = axios.create({
    baseURL: "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/",
});

contactApi.interceptors.request.use(
    (config) => {
        config.headers.Authorization =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU2NDhmMjlkMTI1MDE3ZTc3ZWQ1N2UiLCJpYXQiOjE2MTY4NzMwMDIsImV4cCI6MTYxNjg3NjYwMn0.OGi1EPqU_l4iG4BacSAhp9gf93t8JXEnKjGIXromHwI";
        return config;
    },
    (err) => new Promise.reject(err)
);
