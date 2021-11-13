import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import {
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Box,
  Button,
  Avatar,
  Tooltip
} from "@mui/material";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import sideNavItems from "./sideNavItems";
import useUser from "../../hooks/useUser";
import { logout } from "../../api/auth";
import { upperFirstChar } from "../../helpers/textFunctions";
// import { terms, privacy } from "../../data/outsideLinks";
import { useLocation, useHistory } from "react-router-dom";
const drawerWidth = 270;
const drawerWidthSmall = 75;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    minHeight: "100%",
    borderRight: "1px solid #E3E3E3",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    display: "flex",
    flexDirection: "column"
  },
  drawerClose: {
    borderRight: "1px solid #E3E3E3",
    minHeight: "100%",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    overflowX: "hidden",
    width: drawerWidthSmall
  },
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
    flexDirection: "column",
    justifyContent: "space-between",
    overflowX: "hidden"
  },
  activeBorder: {
    padding: "0 12px"
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.secondary,
    boxShadow: "0px 4px 8px rgba(69, 88, 255, 0.2)"
  }
}));


export default function SideNavDesktop(props) {
  const router = useRouter();
  const classes = useStyles();
  const { user } = useUser();
  const [tod, setTod] = useState("");
  const [updateStyle, setUpdateStyle] = useState("");
  const history = useHistory();
  const handleSignOut = async (e) => {
    e.preventDefault();
    logout();
    router.push("/");
  };

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

  const handleClick = async (e) => {
    history.push(`/app/myaccount`);
  };

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

  return (
    <div
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open
      })}
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open
        })
      }}
    >
      <Box style={{ overflowY: "scroll", height: "100%" }}>
        <div
          className={
            props.open
              ? [classes.activeBorder, classes.border].join(" ")
              : classes.border
          }
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
                style={{
                  color: "#000",
                  textDecoration: "none",
                  padding: "10px"
                }}
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
        </div>
      </Box>
    </div>
  );
}
