import { axios } from "@api";

export default async function googleAuthToken(token, userRole) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post(`${userRole}/google-auth`, null, {
    headers,
    validateStatus: (status) => {
      return status < 500;
    },
  });

  return response.data;
}
