import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommonInput from "./CommonInput";

const useStyles = makeStyles((theme) => ({

}));

export default function Search(props) {
  const { placeholder, handleFilter, status } = props;
  const classes = useStyles();

  return (
    <CommonInput
      onChange={(e) => handleFilter(e)}
      placeholder={placeholder}
      name={status}
      style={{ fontWeight: "normal", color: "#727272", fontSize: "14px" }}
      InputProps={{
        style: { borderRadius: "14px", backgroundColor: "#FFF" },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  );
}
