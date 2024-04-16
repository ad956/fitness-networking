import axios from "axios";
import { SERVER_URL } from "@constants";

export default async function googleAuthToken(token, userRole) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(
      `${SERVER_URL}${userRole}/google-auth`,
      null,
      {
        headers,
      }
    );

    if (response.message) {
      throw new Error("Google Authentication failed");
    }

    const res = response.data;
    return res;
  } catch (error) {
    throw new Error("Google Authentication failed. Please try again later.");
  }
}
