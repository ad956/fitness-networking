import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleFormSubmit = () => {};

  return (
    <section className="h-[100vh] w-full flex flex-col justify-aroun items-center border-2 border-rose-500">
      <h2 className="font-bold">Sign in to Fitness Networking</h2>

      <Button
        // color="primary"
        variant="bordered"
        className=""
      >
        <FcGoogle /> Sign in with Google
      </Button>

      <p className="">or sign in with email</p>

      <form className="" onSubmit={handleFormSubmit}>
        <Input
          type="email"
          label="Email"
          defaultValue="junior@nextui.org"
          className="max-w-xs"
        />
        <Input
          type="password"
          label="Password"
          defaultValue="123456"
          className="max-w-xs"
        />
      </form>
    </section>
  );
}

export default Login;
