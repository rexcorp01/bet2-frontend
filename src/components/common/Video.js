import React from "react";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  video: {
    borderRadius: "16px",
    boxShadow: "0px 4px 15px rgba(39, 21, 2, 0.2)",
  },
});

export default function Video(props) {
  const classes = useStyles();
  const { children, width = "100%", height = "100%" } = props;

  return (
    <video className={classes.video} width={width} height={height} {...props}>
      {children}
    </video>
  );
}
