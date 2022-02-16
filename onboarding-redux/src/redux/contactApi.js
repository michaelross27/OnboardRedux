import axios from "axios";

const getAccessToken = async () => {
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
};
