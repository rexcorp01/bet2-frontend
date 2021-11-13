import {
  Grid,
  Box,
  Paper,
  useMediaQuery,
  Button,
  Link
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingButton from "../src/components/common/buttons/LoadingButton";
import { useTheme } from "@mui/material/styles";
import PublicHeader from "../src/components/common/PublicHeader";

export default function PasswordErrorMessage(props) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const smallDevice = useMediaQuery(theme.breakpoints.only("xs"));
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = () => {
    router.push("/");
  };
  return (
    <Box position="relative">
      <PublicHeader />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ margin: "60px 0" }}
      >
        <Grid item xs={11} md={7} xl={7}>
          <Paper elevation={3} style={{ borderRadius: "20px" }}>
            <Box padding={smallDevice ? "20px" : "75px 75px"}>
              <Box mb="32px" textAlign="center" color={theme.palette.error.main}>
                <Box fontSize="30px" fontWeight={800}>
                  There was an error in resetting your password
                </Box>
                <Box fontSize="20px" padding={3}>
                  Please head back to the homepage and try again.
                </Box>
              </Box>
              <Box mb="24px">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <LoadingButton
                    style={{ width: "300px" }}
                    onClick={handleClick}
                    type="button"
                    variant="contained"
                    color="primary"
                  >
                    Back to Homepage
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
