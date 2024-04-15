import axios from "axios";
import { SERVER_URL } from "@constants";

export default async function loginUser(user) {
  try {
    const response = await axios.post(`${SERVER_URL}tmp`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.error) {
      throw new Error("Login failed");
    }

    const data = response.data;
    console.log(data);

    return data;
  } catch (error) {
    throw new Error("Login failed");
  }
}
