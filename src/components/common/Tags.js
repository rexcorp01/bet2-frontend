import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/material";

const useStyles = makeStyles({});

export default function Tags(props) {
  const classes = useStyles();
  const { children } = props;

  return (
    <Box
      display="inline-block"
      boxShadow="0px 2px 4px rgba(39, 21, 2, 0.15)"
      borderRadius="8px"
      fontSize="14px"
      color="#008895"
      fontWeight={500}
      padding="6px 16px"
      bgcolor="#fff"
    >
      {children}
    </Box>
  );
}
