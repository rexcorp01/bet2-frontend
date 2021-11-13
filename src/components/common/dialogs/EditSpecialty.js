import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  FormControl,
  FormControlLabel,
  TextareaAutosize
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { EditIcon } from "../../../../public/icons/icons";
import useAlert from "../../../hooks/useAlert";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EditPhoto from "./EditPhoto";
import ConfirmDelete from "../dialogs/ConfirmDelete";
import { CloseOutlined } from "@mui/icons-material";
import SwitchButton from "../buttons/SwitchButton";
import LoadingButton from "../buttons/LoadingButton";
import CommonInput from "../inputs/CommonInput";
import CommonButton from "../buttons/CommonButton";
import { updateSpecialty, addSpecialty } from "../../../api/categories";

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

export default function EditSpecialty({
  openModal,
  handleClose,
  modalTitle,
  item,
  deletedItems,
  showDelete,
  categoryId,
  handleEditSpecialty
}) {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const { addAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [specialty, setSpecialty] = useState({});
  const [loadScreen, setLoadScreen] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [editItem, setEditItem] = useState({});

  const xsDevice = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    setSpecialty(item);
  }, [item]);

  const handleSpecialty = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSpecialty((prev) => ({
      ...prev,
      [name]: value
    }));
    setDisabled(false);
  };

  const handleChange = (event) => {
    setSpecialty({
      ...specialty,
      [event.target.name]: event.target.checked
    });
    setDisabled(false);
  };

  async function newSpecialty(e) {
    e.preventDefault();
    setLoading(true);
    if (errorMsg) {
      setErrorMsg("");
    }
    const { title, description, is_displayed } = specialty;
    const body = {
      title,
      description,
      categoryId,
      is_displayed
    };

    try {
      const resp = await addSpecialty(body);
      if (resp && resp.success) {
        addAlert("success", "Successfully created a specialty");
        handleNewItem(resp.specialties);
        setLoading(false);
      } else {
        setLoading(false);
        setErrorMsg(resp.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error happened:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (errorMsg) {
      setErrorMsg("");
    }
    const { title, description, is_displayed, id, } = specialty;
    const specialtiesId = categoryId
    const body = {
      title,
      description,
      id,
      is_displayed,
      specialtiesId
    };

    try {
      const resp = await updateSpecialty(body);
      if (resp && resp.success) {
        setLoading(false);
        addAlert("success", "Successfully edited specialty");
        handleNewItem(resp.specialties);
      } else {
        setLoading(false);
        setErrorMsg(resp.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error happened:", error);
    }
  }

  const handleNewItem = (newItem) => {
    handleEditSpecialty(newItem);
    handleClose();
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    handleCancel();
  };

  const handleCancel = () => {
    handleClose();
  };
  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <ConfirmDelete
        specialty={specialty}
        openDelete={openDelete}
        handleDeleteClose={handleDeleteClose}
        handleDeleteCancel={handleDeleteCancel}
        deletedItems={deletedItems}
      />
      <Dialog open={openModal} onClose={handleCancel} fullScreen={xsDevice}>
        <EditPhoto
          title="Edit Photo"
          open={open}
          handleClose={() => setOpen(false)}
        />
        <DialogTitle className={classes.dialogTitle}>
          <IconButton aria-label="close" onClick={handleCancel} size="large">
            <CloseOutlined
              style={{
                color: "black",
                backgroundColor: "#FFF",
                border: "1px solid #BDC7E0",
                borderRadius: "5px"
              }}
              fontSize="small"
            />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ height: "100%" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mb="25px"
          >
            <Typography variant="h3">{modalTitle}</Typography>
          </Box>

          <form onSubmit={showDelete ? handleSubmit : newSpecialty}>
            <Grid container mb="25px" justifyContent="center">
              <Badge
                overlap="rectangular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                badgeContent={
                  <IconButton
                    onClick={() => setOpen(true)}
                    style={{
                      backgroundColor: "#0073F4",
                      border: "1px solid #fff",
                      padding: "5px"
                    }}
                    size="large"
                  >
                    <EditIcon
                      fill={"#fff"}
                      style={{ width: "1rem", height: "1rem" }}
                    />
                  </IconButton>
                }
              >
                <Avatar
                  style={{ width: "150px", height: "150px", borderRadius: 24 }}
                  src={item.avatar}
                  variant="square"
                />
              </Badge>
            </Grid>
            <Grid container style={{ marginTop: "25px", marginBottom: "25px" }}>
              <Grid item xs={12}>
                <Box>
                  <CommonInput
                    heading="Name"
                    name="title"
                    onChange={handleSpecialty}
                    value={specialty && specialty.title ? specialty.title : ""}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "15px" }}>
              <Box mb="5px" textAlign="left" fontSize="14px" color="#000">
                Recommended Avg. Cost of a Solution
              </Box>

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={5} xl={5}>
                  <CommonInput
                    type="number"
                    onChange={handleSpecialty}
                    disabled={true}
                    name="firstNum"
                    value={
                      specialty && specialty.firstNum ? specialty.firstNum : ""
                    }
                    InputProps={{
                      style: { borderRadius: "14px" },
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={2}>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      variant="h2"
                      style={{
                        color: "#737D87"
                      }}
                    >
                      -
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={5}>
                  <Box>
                    <CommonInput
                      type="number"
                      disabled={true}
                      onChange={handleSpecialty}
                      name="secondNum"
                      value={
                        specialty && specialty.secondNum
                          ? specialty.secondNum
                          : ""
                      }
                      InputProps={{
                        style: { borderRadius: "14px" },
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        )
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <FormControl>
                    <FormControlLabel
                      control={
                        <SwitchButton
                          checked={
                            specialty && specialty.is_displayed
                              ? specialty.is_displayed
                              : false
                          }
                          onChange={handleChange}
                          name="is_displayed"
                        />
                      }
                      label="Display Cost"
                      labelPlacement="start"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Box mb="5px" textAlign="left" fontSize="14px" color="#000">
                    Description
                  </Box>
                  <Box>
                    <TextareaAutosize
                      name="description"
                      value={
                        specialty && specialty.description
                          ? specialty.description
                          : ""
                      }
                      minRows={4}
                      style={{
                        borderRadius: "10px",
                        padding: "10px",
                        fontFamily: "Gilroy-Medium",
                        backgroundColor: theme.palette.background.paper,
                        fontSize: "14px",
                        minWidth: "100%"
                      }}
                      onChange={handleSpecialty}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="space-evenly"
              pt={4}
            >
              <Grid item pb={4}>
                <CommonButton
                  variant="contained"
                  style={{
                    color: "#737D87",
                    backgroundColor: "#F6F7FB",
                    border: "1px solid #BDC7E0"
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </CommonButton>
              </Grid>
              <Grid item pb={4}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={disabled}
                  loading={loading}
                >
                 {showDelete ? "Save" : "Add" }
                </LoadingButton>
              </Grid>
              <Grid
                container
                justifyContent="center"
                sx={showDelete ? {} : { display: "none" }}
              >
                <Grid item>
                  <CommonButton
                    sx={{
                      color: "red"
                    }}
                    onClick={() => setOpenDelete(true)}
                  >
                    Delete
                  </CommonButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
