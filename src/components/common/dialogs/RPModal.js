import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent
} from "@mui/material";
import LoadingButton from "../buttons/LoadingButton";
import CommonButton from "../buttons/CommonButton";
import CloseIcon from "@mui/icons-material/Close";
import useAlert from "../../../hooks/useAlert";
import { forgotPassword } from "../../../api/auth";
export default function RPModal(props) {
  const { addAlert } = useAlert();
  const { open, handleClose, admin, user } = props;
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);



  const handleCancel = () => {
    handleClose();
  };
  const handleConfirm = async () => {
    setLoading(true);
    const email = user.email;
    const body = {
      email
    };
    try {
      const resp = await forgotPassword(body);
      if (resp && resp.success) {
        setLoading(false);
        addAlert("success", "Email has been successfully sent");
        setVerify(true);
      } else {
        setLoading(false);
        setErrorMsg(resp.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error happened:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} user={user} >
      <DialogTitle style={{ textAlign: "center" }}>Reset Password</DialogTitle>
      <DialogContent>
        {!verify ? (
          <DialogContentText style={{ textAlign: "center" }}>
            Are you sure want to reset password?
          </DialogContentText>
        ) : (
          <DialogContentText style={{ textAlign: "center" }}>
            We've sent an email to {user.email} with instructions on how to
            create a new password.
          </DialogContentText>
        )}
      </DialogContent>
      {!verify ? (
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Box>
            <CommonButton onClick={handleCancel} >
              Cancel
            </CommonButton>
            <LoadingButton
              loading={loading}
              onClick={handleConfirm}
              variant="contained"
              color="primary"
            >
              Reset Password
            </LoadingButton>
          </Box>
        </DialogActions>
      ) : (
        <DialogActions style={{ justifyContent: "center" }}>
          <Box>
            <CommonButton onClick={handleCancel} color="secondary">
              Cancel
            </CommonButton>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
}
