import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Button,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CommonInput from "../src/components/common/inputs/CommonInput";
import LoadingButton from "../src/components/common/buttons/LoadingButton";
import Link from "../src/components/Link";
import DashBoardHeader from "../src/components/common/DashboardHeader";
import { login, forgotPassword } from "../src/api/auth";
import { verifyEmailFormat } from "../src/helpers/validations";
import useAlert  from "../src/hooks/useAlert"
import PublicHeader from "../src/components/common/PublicHeader";

export default function ForgotPassword(props) {
  const router = useRouter();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.only("xs"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisabledButton] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (errorMsg) {
      setErrorMsg("");
    }
    const body = {
      email
    };

    try {
      const resp = await forgotPassword(body);
      if (resp && resp.success) {
        setLoading(false);
        props.history.push("/app/reset/message", { newEmail: email });
      } else {
        setLoading(false);
        setErrorMsg(resp.message);
      }
    } catch (error) {
      setLoading(false);
      addAlert("error", error)
      console.error("An unexpected error happened:", error);
    }
  }

  useEffect(() => {
    setDisabledButton(!verifyEmailFormat(email));
  }, [email])


  const handleClose = (e) => {
    router.push("/");
  };

  return (
    <Box position="relative">
      <PublicHeader/>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ margin: "60px 0" }}
      >
        <Grid item xs={11} md={7} xl={7}>
          <Paper elevation={3} style={{ borderRadius: "20px" }}>
            <Box padding={smallDevice ? "20px" : "75px 140px"}>
              <Box mb="32px" textAlign="center" color="#353C3F">
                <Box fontSize="30px" fontWeight={800}>
                  Forgot Password
                </Box>
                <Box padding={1}>
                  Enter your email and we will send you a new password.
                </Box>
              </Box>
              <Box mb="24px">
                <form onSubmit={handleSubmit}>
                  {errorMsg && (
                    <Box mb="10px" color="red" textAlign="center">
                      {errorMsg}
                    </Box>
                  )}
                  <Box mb="48px">
                    <Box mb="24px">
                      <CommonInput
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={disableButton}
                      loading={loading}
                    >
                      Submit
                    </LoadingButton>
                    <Box margin="20px">
                      <Button
                        onClick={handleClose}
                        color="secondary"
                        margin="1"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
