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
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import CommonInput from "../inputs/CommonInput";
import LoadingButton from "../buttons/LoadingButton";
import CommonButton from "../buttons/CommonButton";
import { secondary } from "../../../theme/colors";
import { changePassword } from "../../../api/auth";
import useAlert from "../../../hooks/useAlert";
import {
  verifyEightChar,
  verifyUpper,
  verifySpecialChar,
  verifyNum,
  verifyPassword,
  activateButton
} from "../../../helpers/validations";
export default function ChangePassword(props) {
  const { open, handleClose } = props;
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
  const [currentPassword, setcurrentPassword] = useState("");
  const [showcurrentPassword, setShowcurrentPassword] = useState(false);
  const { addAlert } = useAlert();

  useEffect(() => {
    setIconEightChar(verifyEightChar(password));
    setIconUpper(verifyUpper(password));
    setIconNum(verifyNum(password));
    setIconSpecial(verifySpecialChar(password));
    setDisabledButton(activateButton(password, confirmPassword));
  }, [password, confirmPassword]);

  const handleClickPassword = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (errorMsg) {
      setErrorMsg("");
    }
    const newPassword = password;
    const body = {
      currentPassword,
      newPassword
    };

    try {
      const resp = await changePassword(body);
      if (resp && resp.success) {
        setLoading(false);
        addAlert("success", "Successfully changed password");
        handleCancel();
      } else {
        setLoading(false);
        setErrorMsg(resp.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error happened:", error);
    }
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleClickOldPassword = () => {
    setShowcurrentPassword((prev) => !prev);
  };

  const handleCancel = () => {
    setcurrentPassword("");
    setConfirmPassword("");
    setPassword("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullScreen={smallDevice}>
      <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
        Change Password
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <Box mb="10px" color={theme.palette.error.main} textAlign="center">
              {errorMsg}
            </Box>
          )}
          <Box mb="48px">
            <Box mb="15px">
              <CommonInput
                heading="Current Password"
                type={showcurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                required
                onChange={(e) => setcurrentPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickOldPassword}
                        edge="end"
                        size="large"
                      >
                        {showcurrentPassword ? (
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
            <Box mb="15px">
              <CommonInput
                heading="New Password"
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box mb="14px">
              <CommonInput
                heading="Confirm New Password"
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
          <Grid
            container
            display="flex"
            justifyContent="space-between"
            spacing={4}
          >
            <Grid item>
              <CommonButton
                variant="contained"
                onClick={handleCancel}
                style={{
                  color: "#737D87",
                  backgroundColor: "#F6F7FB",
                  border: "1px solid #BDC7E0"
                }}
              >
                Cancel
              </CommonButton>
            </Grid>
            <Grid item>
              <LoadingButton
                disabled={disableButton}
                type="submit"
                variant="contained"
                color="primary"
                loading={loading}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
