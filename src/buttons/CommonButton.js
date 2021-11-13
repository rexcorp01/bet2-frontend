import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "220px",
    // height: "50px",
    // color: theme.palette.primary.main,
    fontSize: "18px",
    // border: `1px solid ${theme.palette.primary.main}`,
    // "&:hover": {
    //   color: "#fff",
    //   background: theme.palette.primary.main,
    // },
    // "&:disabled": {
    //   color: theme.palette.primary.main,
    //   background: "transparent",
    // },
  },
}));

export default function CommonButton(props) {
  const classes = useStyles();
  const { children, ...rest } = props;

  return (
    <Button
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
