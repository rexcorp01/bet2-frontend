import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Button,
  TextField
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CommonInput from "../src/components/common/inputs/CommonInput";
import LoadingButton from "../src/components/common/buttons/LoadingButton";
import { forgotPassword } from "../src/api/auth";
import {
  verifyEightChar,
  verifyUpper,
  verifySpecialChar,
  verifyNum,
  verifyPassword,
  activateButton
} from "../src/helpers/validations";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../src/api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import useQuery from "../src/helpers/useQuery";
import PublicHeader from "../src/components/common/PublicHeader";

export default function ResetPassword() {
  const router = useRouter();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.only("xs"));
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [iconEightChar, setIconEightChar] = useState(false);
  const [iconUpper, setIconUpper] = useState(false);
  const [iconNum, setIconNum] = useState(false);
  const [iconSpecial, setIconSpecial] = useState(false);
  const [disableButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  let query = useQuery();

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  useEffect(() => {
    setIconEightChar(verifyEightChar(password));
    setIconUpper(verifyUpper(password));
    setIconNum(verifyNum(password));
    setIconSpecial(verifySpecialChar(password));
    setDisabledButton(activateButton(password, confirmPassword));
  }, [password, confirmPassword]);

  useEffect(() => {
    setUserId(query.get("userId"));
  }, []);

  const handleClickPassword = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (errorMsg) {
      setErrorMsg("");
    }

    const body = {
      password
    };
    const param = userId;

    try {
      const resp = await resetPassword(body, param);
      if (resp && resp.success) {
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        setErrorMsg(resp.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error happened:", error);
    }
  }

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
            <Box padding={smallDevice ? "20px" : "75px 140px"}>
              <Box
                mb="48px"
                textAlign="center"
                color={theme.palette.text.header}
                fontSize="30px"
                fontWeight={500}
              >
                <Box>Create New Password</Box>
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
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickPassword}
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
                    <Box mb="14px">
                      <CommonInput
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                                size="large"
                              >

                                {showConfirmPassword ? (
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
                    <Grid container flexDirection="column">
                      <Grid item xs={12}>
                        <Box display="flex">
                          <Box
                            p={1}
                            color={
                              !disableButton
                                ? theme.palette.success.main
                                : theme.palette.error.main
                            }
                          >
                            Both passwords match
                          </Box>
                          <Box component="span" p={1}>
                            <FontAwesomeIcon
                              icon={!disableButton ? faCheck : faTimes}
                              color={
                                !disableButton
                                  ? theme.palette.success.main
                                  : theme.palette.error.main
                              }
                            />
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item>
                        <Box display="flex">
                          <Box
                            p={1}
                            color={
                              iconNum
                                ? theme.palette.success.main
                                : theme.palette.error.main
                            }
                          >
                            At least 1 numerical value
                          </Box>
                          <Box p={1}>
                            <FontAwesomeIcon
                              icon={iconNum ? faCheck : faTimes}
                              color={
                                iconNum
                                  ? theme.palette.success.main
                                  : theme.palette.error.main
                              }
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box display="flex">
                          <Box
                            p={1}
                            color={
                              iconUpper
                                ? theme.palette.success.main
                                : theme.palette.error.main
                            }
                          >
                            At least 1 capital character
                          </Box>
                          <Box p={1}>
                            <FontAwesomeIcon
                              icon={iconUpper ? faCheck : faTimes}
                              color={
                                iconUpper
                                  ? theme.palette.success.main
                                  : theme.palette.error.main
                              }
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box display="flex">
                          <Box
                            p={1}
                            color={
                              iconSpecial
                                ? theme.palette.success.main
                                : theme.palette.error.main
                            }
                          >
                            At least 1 special character
                          </Box>
                          <Box p={1}>
                            <FontAwesomeIcon
                              icon={iconSpecial ? faCheck : faTimes}
                              color={
                                iconSpecial
                                  ? theme.palette.success.main
                                  : theme.palette.error.main
                              }
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box display="flex">
                          <Box
                            p={1}
                            color={
                              iconEightChar
                                ? theme.palette.success.main
                                : theme.palette.error.main
                            }
                          >
                            At least 8 characters in length
                          </Box>
                          <Box p={1}>
                            <FontAwesomeIcon
                              icon={iconEightChar ? faCheck : faTimes}
                              color={
                                iconEightChar
                                  ? theme.palette.success.main
                                  : theme.palette.error.main
                              }
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <LoadingButton
                      disabled={disableButton}
                      type="submit"
                      variant="contained"
                      color="primary"
                      loading={loading}
                    >
                      Save
                    </LoadingButton>
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
