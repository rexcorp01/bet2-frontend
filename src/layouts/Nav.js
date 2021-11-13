import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import { Box, useMediaQuery } from "@mui/material";
import DashboardHeader from "../components/common/DashboardHeader";
import SideNavDesktop from "../components/drawer/Desktop";
import SideNavMobile from "../components/drawer/Mobile";

const drawerWidth = 500;
const drawerWidthSmall = 65;

const useStyles = makeStyles((theme) => ({
  main: {
    height: "calc(100vh - 60px)",
    display: "flex",
    [theme.breakpoints.down('md')]: {
      padding: "0"
    }
  }
}));

export default function NavLayout(props) {
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('lg'));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState("");

  useEffect(() => {
    if (smallDevice) {
      setWidth("100%");
      } else {
        setWidth(`calc(100% - ${drawerWidthSmall}px)`);
      }
  }, [open, smallDevice]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style ={{height: "calc(100vh - 60px)"}}>
      <DashboardHeader
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        open={open}
      />
      <Box className={classes.main}>
        {smallDevice ? (
          <SideNavMobile open={open} onClose={handleDrawerClose} />
        ) : (
          <SideNavDesktop open={open} />
        )}
        <Box
          style={{
            width: width,
            position: "relative",
            zIndex: 1000,
            overflowY: "scroll"
          }}
        >
          {props.children}
        </Box>
      </Box>
    </div>
  );
}
