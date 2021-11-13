import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CommonInput from "../src/components/common/inputs/CommonInput";
import LoadingButton from "../src/components/common/buttons/LoadingButton";
import { verifyEmailFormat } from "../src/helpers/validations";
import { login, forgotPassword } from "../src/api/auth";
import useAlert from "../src/hooks/useAlert";
import DashBoardHeader from "../src/components/common/DashboardHeader";
import { AlertProvider } from "../src/context/alertContext";
import PublicHeader from "../src/components/common/PublicHeader";

export default function Signin() {
  const router = useRouter();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.only("xs"));
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(checked);
    const initialValue = true;
    return initialValue || false;
  });
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addAlert } = useAlert();
  const [disableButton, setDisabledButton] = useState(true);
  const [email, setEmail] = useState(() => {
    const saved = localStorage.getItem("email");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  console.log(checked)

  useEffect(() => {
    setDisabledButton(!verifyEmailFormat(email));
  }, [email]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };


  const handleFPOpen = () => {
    router.push("app/forgot/password");
  };

  async function handleSubmit(e) {
    if (checked && email) {
      localStorage.setItem("email", JSON.stringify(email));
      localStorage.setItem("checked", JSON.stringify(checked))
    }
    if (!checked && email) {
      localStorage.removeItem("email");
      localStorage.removeItem("checked")
    }
    e.preventDefault();
    setLoading(true);
    if (errorMsg) {
      setErrorMsg("");
    }

    const body = {
      email,
      password
    };

    try {
      const resp = await login(body);
      if (resp && resp.data.success) {
        setLoading(false);
        window.sessionStorage.setItem(
          "authtoken",
          JSON.stringify(resp.headers.authorization)
        );
        router.push("app/dashboard");
      } else {
        setLoading(false);
        addAlert("error", "An Unexpected error happened");
        setErrorMsg(resp.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error happened:", error);
    }
  }

  return (
    <AlertProvider>
      <Box position="relative">
        <PublicHeader />
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ margin: "60px 0" }}
        >
          <Grid item xs={11} md={7} xl={7}>
            <Paper
              elevation={3}
              style={{ borderRadius: "20px", borderColor: "#D4D4D4" }}
            >
              <Box padding={smallDevice ? "20px" : "75px 140px"}>
                <Box
                  mb="48px"
                  textAlign="center"
                  color={theme.palette.text.header}
                  fontSize="30px"
                  fontWeight={800}
                >
                  <Box>Sign In</Box>
                </Box>
                <Box mb="24px">
                  <form onSubmit={handleSubmit}>
                    {errorMsg && (
                      <Box
                        mb="10px"
                        color={theme.palette.error.main}
                        textAlign="center"
                      >
                        {errorMsg}
                      </Box>
                    )}
                    <Box mb="48px">
                      <Box mb="24px">
                        <CommonInput
                          heading="Email Address"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Box>
                      <Box mb="14px">
                        <CommonInput
                          heading="Password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                  size="large"
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        color={theme.palette.text.label}
                        fontSize="14px"
                        fontWeight={400}
                        alignItems="center"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={(e) => setChecked(e.target.checked)}
                              name="rememberMe"
                              color="primary"
                            />
                          }
                          label={
                            <Typography variant="body1">Remember Me</Typography>
                          }
                        />
                        <Button
                          type="button"
                          onClick={handleFPOpen}
                          color="primary"
                        >
                          Forgot password?
                        </Button>
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={loading}
                        disabled={disableButton}
                        style={{ width: "800px" }}
                      >
                        Sign In
                      </LoadingButton>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AlertProvider>
  );
}
