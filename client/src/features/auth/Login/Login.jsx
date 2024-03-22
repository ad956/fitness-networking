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
    >
      <Typography
        variant="h2"
        sx={{ color: theme.palette.notification.secondary }}
      >
        Fitness Networking
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 2,
            m: 3,
            p: 1,
          }}
        >
          <Typography variant="overline" sx={{ fontWeight: "bold" }}>
            Log in to Your Account
          </Typography>
          <Typography variant="caption" sx={{ color: grey.A700 }}>
            Login for personalized workout plans, fitness connections, and an
            enhanced fitness journey on our platform.
          </Typography>
          <FormControl fullWidth>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption">Email</Typography>
              <TextField
                id="email"
                type="text"
                label={"Enter your email address"}
                value={email}
                required
                sx={{
                  marginBottom: 1,
                  "& .MuiInputBase-input": {
                    color: "blue", // Adjust the color based on your design
                  },
                }}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption">Password</Typography>
              <TextField
                type="password"
                label={"Enter your password"}
                value={password}
                required
                sx={{ marginBottom: 1 }}
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <div className="flex items-center">
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: blue[800],
                    "&.Mui-checked": {
                      color: blue[600],
                    },
                  }}
                />
                <Typography variant="subtitle1">Remember Me</Typography>
              </div>

              <Button
                variant="outlined"
                sx={{
                  color: blue[800],
                  textTransform: "capitalize",
                }}
              >
                Forgot password
              </Button>
            </Box>

            <Button
              variant="contained"
              sx={{
                width: "50%",
                color: "white",
                backgroundColor: "#3457dc",
                textTransform: "capitalize",
                margin: "0 auto",
              }}
            >
              LOG IN
            </Button>
          </FormControl>
        </Stack>

        <Stack>Stack to be added here</Stack>
      </Box>
    </Container>
  );
}

export default Login;
