import {
  Container,
  Typography,
  Box,
  Stack,
  FormControl,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";
import { theme } from "../../../theme/theme";
import { useState } from "react";
import { blue, grey } from "@mui/material/colors";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Container
      sx={{
        p: 1,
        m: 0,
      }}
    ></Container>
  );
}

export default Login;
