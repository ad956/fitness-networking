import axios from "@api";

export default async function signupUser({ email, password, role }) {
  try {
    const response = await axios.post(`/api/${role}/signup`, {
      email,
      password,
      role,
    });

    if (!response.data.success) {
      throw new Error("signup failed");
    }

    return response.data;
  } catch (error) {
    throw new Error("signup failed");
  }
}
