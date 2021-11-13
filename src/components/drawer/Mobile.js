import { useRouter } from "next/router";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useLocation, useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Box,
  Button,
  Avatar,
  Drawer,
  Tooltip,
  Typography
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import sideNavItems from "./sideNavItems";
import dayjs from "dayjs";
import useUser from "../../hooks/useUser";
import { upperFirstChar } from "../../helpers/textFunctions";
import { logout } from "../../api/auth";

const useStyles = makeStyles((theme) => ({
  footerItem: {
    color: "#000",
    fontSize: "14px",
    fontWeight: "normal",
    cursor: "pointer"
  },
  avatar: {
    width: 50,
    height: 50
  },
  border: {
    display: "flex",
    height: "100%",
    flexDirection: "column"
  },
  activeBorder: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    paddingRight: "30px",
    paddingLeft: "30px"
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px"
  },
  notActive: {}
}));

export default function SideNavMobile(props) {
  const theme = useTheme();
  const router = useRouter();
  const { open, onClose } = props;
  const classes = useStyles();
  const [tod, setTod] = useState("");
  const { user, handleUser } = useUser();
  const [updateStyle, setUpdateStyle] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profile, setProfile] = useState({});
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (user) {
      setProfile(user);
      setAvatar((user && user.avatar) || "");
    }
  }, [user]);

  useEffect(() => {
    const splitLocation = location.pathname
      .split("/app/")
      .filter((item) => item);
    if (splitLocation[0].split("/")) {
      const findLocation = splitLocation[0].split("/");
      setUpdateStyle(findLocation[0]);
    } else {
      setUpdateStyle(splitLocation[0]);
    }
  }, [location.pathname]);

  useEffect(() => {
    const now = dayjs().hour();
    if (now < 12) {
      setTod("Good Morning");
    } else if (now >= 12 && now <= 17) {
      setTod("Good Afternoon");
    } else {
      setTod("Good Evening");
    }
  }, []);

  const closeDrawer = async (e) => {
    onClose();
  };
  const handleClick = async (e) => {
    history.push(`/app/myaccount`);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    logout();
    router.push("/");
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { width: "300px", paddingRight: "8px", paddingLeft: "8px" }
      }}
    >
      <List>
        <Box display="flex" alignItems="center" mt="15px" paddingLeft="4px">
          <Avatar
            alt="Profile Image"
            src={user ? user.avatar : ""}
            className={classes.avatar}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
          <Box ml="14px">
            <Box fontSize="12px" fontWeight="normal" color="#717171">
              {tod}
            </Box>
            <Box
              color="#000"
              fontSize="20px"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              <strong>
                {user &&
                  `${upperFirstChar(user.first_name)} ${upperFirstChar(
                    user.last_name
                  )}`}
              </strong>
            </Box>
          </Box>
        </Box>

        {sideNavItems.map((item, index) => (
          <NavLink
            key={item.label}
            to={`/${item.link}`}
            style={{ color: "#000", textDecoration: "none", padding: "10px" }}
            activeStyle={{
              color: "#FFF"
            }}
          >
            <ListItem
              alignItems="center"
              className={
                updateStyle === item.id && props.open
                  ? classes.active
                  : classes.notActive
              }
            >
              <Tooltip title={!props.open ? item.label : ""}>
                <ListItemIcon>
                  {updateStyle === item.id && props.open
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>
              </Tooltip>
              {props.open && <ListItemText primary={item.label} />}
            </ListItem>
          </NavLink>
        ))}
      </List>

      <Box mt="30px" alignItems="center">
        <List>
          <ListItem onClick={handleSignOut}>
            <Box className={classes.signOut}>
              <Tooltip title={!props.open ? "Sign Out" : ""}>
                <ExitToAppIcon cursor="pointer" />
              </Tooltip>
            </Box>
            <Box margin="25px" className={classes.footerItem}>
              <Typography>Sign Out</Typography>
            </Box>
          </ListItem>
        </List>
        {props.open && (
          <Box>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={4}
            >
              <Grid item className={classes.footerItem}>
                <a target="_blank">Privacy Policy</a>
              </Grid>
              <Grid item className={classes.footerItem}>
                <a target="_blank">Terms of Use</a>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
