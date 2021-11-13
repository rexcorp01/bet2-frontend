import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormControlLabel, TextareaAutosize } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  Grid,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  Typography,
  Badge,
  Avatar,
  Switch,
  FormControl
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonInput from "../inputs/CommonInput";
import CommonButton from "../buttons/CommonButton";
import { EditIcon } from "../../../../public/icons/icons";
import useAlert from "../../../hooks/useAlert";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { mergeClasses } from "@mui/styles";
import EditPhoto from "./EditPhoto";
import { addCategory } from "../../../api/categories";
import SwitchButton from "../buttons/SwitchButton";
import LoadingButton from "../buttons/LoadingButton";
import { CloseOutlined } from "@mui/icons-material";
import { deleteSpecialty } from "../../../api/categories";
import { deleteReview } from "../../../api/review";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    color: "#4D4E5C"
  }
}));

export default function DeleteCategory({
  openDelete,
  handleDeleteClose,
  handleDeleteCancel,
  deletedItems,
  specialty = {},
  review = {}
}) {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.only("xs"));
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addAlert } = useAlert();
  const xsDevice = useMediaQuery(theme.breakpoints.down("xs"));

  async function handleDeleteReview(e) {
    const body = {
      id: review.id
    };
    try {
      const resp = await deleteReview(body);
      if (resp && resp.success) {
        setLoading(false);
        addAlert("success", "Successfully deleted review");
        deletedItems(review);
        handleDeleteCancel();
      } else {
        setLoading(false);
        addAlert("error", "An unexpected error happened");
        handleDeleteCancel();
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error happened:", error);
    }
  }

  async function handleDelete(e) {
    const body = {
      id: specialty.id
    };
    try {
      const resp = await deleteSpecialty(body);
      if (resp && resp.success) {
        setLoading(false);
        addAlert("success", "Successfully deleted specialty");
        deletedItems(specialty);
        handleDeleteClose();
      } else {
        setLoading(false);
        addAlert("error", "An unexpected error happened");
        setErrorMsg(resp.message);
        handleDeleteCancel();
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error happened:", error);
    }
  }

  return (
    <Dialog
      open={openDelete}
      onClose={handleDeleteCancel}
      fullScreen={xsDevice}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton
          aria-label="close"
          onClick={handleDeleteCancel}
          size="large"
        >
          <CloseOutlined
            style={{
              color: "#000",
              backgroundColor: "#FFF",
              border: "1px solid #BDC7E0",
              borderRadius: "5px"
            }}
            fontSize="small"
          />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ overflow: "hidden" }}>
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
            mb="40px"
          >
            <Typography variant="h3">{`Delete a ${
              specialty && specialty.title ? "specialty" : "review"
            }`}</Typography>
          </Box>

          <Grid container style={{ marginTop: "25px" }}>
            <Box mb="60px" textAlign="center" style={{ minWidth: "100%" }}>
              <Typography>{`Are you sure you want to delete this ${
                specialty && specialty.title ? "specialty" : "review"
              }?`}</Typography>
            </Box>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            <Grid item>
              <CommonButton variant="contained" onClick={handleDeleteCancel}>
                Cancel
              </CommonButton>
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                sx={{ color: "red" }}
                loading={loading}
                onClick={
                  review && review.id ? handleDeleteReview : handleDelete
                }
              >
                Delete
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
