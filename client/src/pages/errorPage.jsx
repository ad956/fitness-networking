import { useLocation } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";
export default function ErrorPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorMsg = queryParams.get("msg");

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        {errorMsg ? (
          <>
            <Typography variant="h4" color="error" gutterBottom>
              Error
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {errorMsg}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" color="error" gutterBottom>
              404 Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary">
              The page you are looking for does not exist.
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
}
