import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Link, useLocation } from "react-router-dom";
import BaseLink from "./BaseLink";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { upperFirstChar } from "../../helpers/textFunctions";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    padding: "15px 0",
    fontSize: "12px",
    fontFamily: "Avenir",
    fontWeight: 500,
  },
}));

export default function Crumbs(props) {
  const location = useLocation();
  const classes = useStyles();
  const splitLocation = location.pathname.split("/").filter((item) => item);

  let path = "";

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
      {splitLocation.map((name, i) => {
        path += "/" + name;
        if (splitLocation.length > 1) {
          return (
            <BaseLink to={i === 0 ? `/${name}` : path} key={i}>
              {i === 0 ? "Home" : upperFirstChar(name)}
            </BaseLink>
          );
        }
        return null;
      })}
    </Breadcrumbs>
  );
}
