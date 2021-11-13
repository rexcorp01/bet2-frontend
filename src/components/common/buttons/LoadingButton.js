import React from "react";
import { Button, CircularProgress } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "225px",
    fontSize: "16px",
  },
  progress: {
    color: theme.palette.primary.contrastText,
  },
}));

const LoadingButton = (props) => {
  const classes = useStyles();
  const { width, children, loading = false, ...rest } = props;

  return (
    <Button
    classes={{
      root: classes.root,
      label: classes.label,
    }}
      {...rest}
    >
      {loading ? <CircularProgress className={classes.progress} /> : children}
    </Button>
  );
};

export default LoadingButton;
