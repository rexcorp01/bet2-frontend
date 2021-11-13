import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import useAlert from "../../hooks/useAlert"


const useStyles = makeStyles((theme) => ({
  topBar: {
    top: 10,
  },
  content: {
    fontSize: "14px",
    textAlign: "center"
  }
}));

const GlobalMessage = () => {
  const classes = useStyles();
  const { alert, removeAlert } = useAlert();
  const handleClose = () => {
    removeAlert();
  };

  return (
    <Snackbar
      sx={{ minWidth: "100%", justifyContent: "center" }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={(alert && alert.open) || false}
      autoHideDuration={10000}
      onClose={handleClose}
      ContentProps={{
        classes: {
          root: classes.content
        }
      }}
      classes={{ root: classes.topBar }}
    >
      <Alert
        severity={(alert && alert.severity) || "info"}
        sx={{ minWidth: "100%", justifyContent: "center" }}
      >
        {alert && alert.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalMessage;
