import axios from "axios";
import { accessManagement as iam } from "../utils/accessManagement";

/* const getAccessToken = async () => {
  const authResponse = await axios.post("auth/signin", {
    baseURL: "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/",
    data: {
      username: "malihmailtest@gmail.com",
      password: "malihmail",
    },
  });
  const { access_token } = authResponse.data;
  return access_token;
};

export const contactApi = async () => {
  const accessToken = await getAccessToken();
  console.log(accessToken);
  return await axios.create({
    baseURL: "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1",
    headers: {
      authorization: `Bearer ${accessToken}`,
      accept: "application/json",
      "Content-Type": "application.json",
    },
  });
}; */

export const contactApi = axios.create({
    baseURL: "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1",
});

contactApi.interceptors.request.use(
    (config) => {
        const tokenType = iam.tokenType.get() ? iam.tokenType.get() : "";
        const accessToken = iam.token.get() ? iam.token.get() : "";
        const tenantReference = iam.tenantReference.get()
            ? iam.tenantReference.get()
            : "";
        config.headers.Authorization = `${tokenType} ${accessToken}`;
        config.headers.tenantReference = tenantReference;
        return config;
    },
    (err) => new Promise.reject(err)
);

