import { useState } from "react";
import { Button } from "@nextui-org/react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <section className="flex flex-col justify-around items-center">
      <h2 className="font-bold">Sign in to Fitness Networking</h2>

      <Button color="primary" variant="bordered" className="">
        Sign in with Google
      </Button>
    </section>
  );
}

export default Login;
