import { Grid, Box, Paper, useMediaQuery, Button, Link, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingButton from "../src/components/common/buttons/LoadingButton";
import { useTheme } from "@mui/material/styles";
import { forgotPassword } from "../src/api/auth";
import useAlert from "../src/hooks/useAlert";
import PublicHeader from "../src/components/common/PublicHeader";

export default function ResetMessage(props) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const smallDevice = useMediaQuery(theme.breakpoints.only("xs"));
  const [errorMsg, setErrorMsg] = useState("");
  const [disableButton, setDisabledButton] = useState(false)
  const {addAlert} = useAlert()
  let email;

  if (!props.location.state) {
    router.push("/app/resetpassword/error");
  } else {
    email = props.location.state.newEmail
  }

   const handleClick = () => {
    router.push("/")
   }

async function handleSubmit(e) {

  e.preventDefault();
  setLoading(true);
  setDisabledButton(true)
  if (errorMsg) {
    setErrorMsg("");
  }
  const body = {
    email
  };

  try {
    const resp = await forgotPassword(body);
    if (resp && resp.success) {
      addAlert("success", "Check your inbox. Email has been resent")
      setLoading(false);
      router.push("/app/reset/message");
      setDisabledButton(false)
    } else {
      setLoading(false);
      addAlert("error", resp.message);
    }
  } catch (error) {
    setLoading(false);
    addAlert("error", error);
    console.error("An unexpected error happened:", error);
  }

}

   return (
     <Box position="relative">
       <PublicHeader/>
       <Grid
         container
         justifyContent="center"
         alignItems="center"
         style={{ margin: "60px 0" }}
       >
         <Grid item xs={11} md={7} xl={7}>
           <Paper elevation={3} style={{ borderRadius: "20px" }}>
             <Box padding={smallDevice ? "20px" : "75px 140px"}>
               <Box mb="40px" textAlign="center" color={theme.palette.text.header}>
                 <Box fontSize="30px" fontWeight={800}>
                   Check Your Email
                 </Box>
                 <Box padding={2}>
                   We've sent an email to {email} with instructions on how to
                   create a new password.
                 </Box>
                 <Box padding={2}>
                   It may take a few minutes to appear in your inbox. If you
                   didn't receive it, check your spam box or click below to
                   resend.
                 </Box>
               </Box>
               <Box mb="30px" mt="30px">
                 <Box display="flex" flexDirection="column" alignItems="center">
                   <LoadingButton
                     onClick={handleClick}
                     type="button"
                     variant="contained"
                     color="primary"
                   >
                     Sign In
                   </LoadingButton>
                   <Box margin="40px" textAlign="center">
                     <Box>Didn't get an email?</Box>
                     <Button
                       onClick={handleSubmit}
                       color="secondary"
                       disabled={disableButton}
                     >
                       Resend Email
                     </Button>
                   </Box>
                 </Box>
               </Box>
             </Box>
           </Paper>
         </Grid>
       </Grid>
     </Box>
   );
}
