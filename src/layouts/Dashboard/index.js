import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
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
const drawerWidth = 250;
const drawerWidthSmall = 65;

const useStyles = makeStyles((theme) => ({
  main: {
    height: "calc(100% - 60px)",
    display: "flex",
    padding: "20px 30px 50px 0",
    [theme.breakpoints.down('md')]: {
      padding: "0"
    }
  }
}));

export default function DashboardLayout(props) {
  const { title = "", userArrow, handleClick} = props;
  const classes = useStyles();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <Box mt="20px" mb="45px">
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >

            <Grid item>
              <Typography variant="h3">{title}</Typography>
            </Grid>

          </Grid>
        </Box>
        {props.children}
      </Grid>
    </Grid>

  );
}
