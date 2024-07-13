import { axios } from "@api";

export default async function loginUser(user) {
  const path = user.role === "user" ? "user" : "partner";
  try {
    const response = await axios.post(`${path}/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.message) {
      throw new Error("Login failed");
    }

    const data = response.data;
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid email/mobile or password");
    } else {
      throw new Error("Login failed. Please try again later.");
    }
  }
}
