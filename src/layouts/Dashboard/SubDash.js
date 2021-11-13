import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import {
  Grid,
  Box,
  Typography,
  InputAdornment,
  useMediaQuery,
  IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Search from "../../components/common/inputs/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommonButton from "../../components/common/buttons/CommonButton";
import LoadingButton from "../../components/common/buttons/LoadingButton";
import RPModal from "../../components/common/dialogs/RPModal"
import { useRouter } from "next/router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const drawerWidth = 250;
const drawerWidthSmall = 65;

const useStyles = makeStyles((theme) => ({
  main: {
    height: "calc(100% - 60px)",
    display: "flex",
    padding: "20px 30px 50px 0",
    [theme.breakpoints.down("md")]: {
      padding: "0"
    }
  },
  headerItems: {
    display: "flex",
    alignItems: "center"
  },
  hidden: {
    display: "none"
  }
}));

export default function SubDashLayout(props) {
  const {
    title = "",
    disabledAccount,
    handleReActivate,
    handleDisable,
    loading,
    adminView,
    admin,
    authorized,
    disableLoading,
    categories,
    users
  } = props;
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.only("xs"));
  const history = useHistory();

  useEffect(() => {
    if (admin) {
      setPath("admin");
    }
    if (categories) {
      setPath("categories");
    }
    if(users) {
      setPath("users");
    }
  }, []);


  const handleClick = (e) => {
    history.push(`/app/${path}`);
  };

  const handleResetPassword = (e) => {
    setOpen(true);
  };
  return (
    <>
    <RPModal open={open} handleClose={() => setOpen(false)} />
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <Box mt="20px" mb="45px">
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item className={classes.headerItems}>
              <IconButton onClick={handleClick} size="large">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="subtitle2">{title}</Typography>
            </Grid>
            <Box className={authorized ? "" : classes.hidden}>
              {!disabledAccount ? (
                <Grid item className={classes.headerItems} xs={10}>
                  <Box pr={3} pl={1}>
                    <LoadingButton
                      className={
                        smallDevice ? classes.smallBorder : classes.border
                      }
                      variant="contained"
                      color="secondary"
                      onClick={handleDisable}
                      loading={disableLoading}
                      style={smallDevice ? { width: "175px" } : {}}
                    >
                      Disable Account
                    </LoadingButton>
                  </Box>
                  <Grid item xs={10}>
                    <Box pr={1}>
                      <LoadingButton
                        variant="contained"
                        color="primary"
                        style={smallDevice ? { width: "175px" } : {}}
                        onClick={handleResetPassword}
                      >
                        Reset Password
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Grid item className={classes.headerItems}>
                  <Box>
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      className={
                        smallDevice ? classes.smallBorder : classes.border
                      }
                      loading={disableLoading}
                      onClick={handleReActivate}
                    >
                      Reactivate Account
                    </LoadingButton>
                  </Box>
                </Grid>
              )}
            </Box>
          </Grid>
        </Box>
        {props.children}
      </Grid>
    </Grid>
    </>
  );
}
