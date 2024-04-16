export default async function signupUser({ email, password, role }) {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!response.ok) {
      throw new Error("signup failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("signup failed");
  }
}
