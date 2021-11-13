import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Grid, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    border: "1px solid #E3E3E3",
    backgroundColor: "#F6F7FB",
    height: "60px",
    alignItems: "center",
  },
  gridContainer: {
    height: "60px",
  },
  headerTitle: {
    textAlign: "center",
    color: "#3D3D3D",
    cursor: "pointer"
  }
}));
export default function DashBoardHeader(props) {
  const history = useHistory()
  const classes = useStyles();
  return (
    <Box className={classes.appBar}>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          {props.open ? (
            <IconButton
              color="inherit"
              onClick={props.handleDrawerClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <>
              <IconButton
                color="inherit"
                onClick={props.handleDrawerOpen}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Grid>
        <Grid item xs={4}>
          <Box
            className={classes.headerTitle}
            onClick={() => history.push("/app/dashboard")}
          >
            <Typography variant="h4">FotBets</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
