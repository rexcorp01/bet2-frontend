import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Grid, IconButton, Typography} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    border: "1px solid #E3E3E3",
    height: "60px",
    alignItems: "center"
  },
  gridContainer: {
    height: "60px"
  },
  headerTitle: {
    textAlign: "center",
    color: "#3D3D3D"
  }
}));

export default function PublicHeader(props) {
  const classes = useStyles();
  return (
    <div className={classes.appBar}>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <div className={classes.headerTitle}>
            <Typography variant="h6">Wizow</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
