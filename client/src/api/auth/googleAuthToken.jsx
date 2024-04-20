import axios from "axios";
import { SERVER_URL } from "@constants";

export default async function googleAuthToken(token, userRole) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post(
    `${SERVER_URL}${userRole}/google-auth`,
    null,
    {
      headers,
    }
  );

  return response.data;
}
