import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Box, TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

}));

export default function CommonInput(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <Box>
      {props.heading && (
        <Box
          mb="5px"
          textAlign="left"
          fontSize="14px"
          fontFamily="Gilroy-Medium"
          color="#000"
        >
          {props.heading}
        </Box>
      )}
      <TextField
        classes={{
          root: classes.root
        }}
        variant="outlined"
        {...props}
      >
        {children}
      </TextField>
    </Box>
  );
}
