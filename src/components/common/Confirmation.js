import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMediaQuery } from "@mui/material";

export default function Confirmation(props) {
  const { open, onClose, onConfirm, title = "", message = "", ...rest } = props;
   const theme = useTheme();
   const xsDevice = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={xsDevice}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
