import withStyles from '@mui/styles/withStyles';
import { LinearProgress } from "@mui/material";

const CustomLinearProgress = withStyles((theme) => ({
  colorPrimary: {
    backgroundColor: "#ECE9E5",
  },
  bar: {
    backgroundColor: theme.palette.primary.main,
  },
}))(LinearProgress);

export default function ProgressBar(props) {
  return <CustomLinearProgress {...props} />;
}
