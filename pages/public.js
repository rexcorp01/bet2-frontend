import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../src/components/PrivateRoute";
import PrivatePages from "../src/pages/PrivatePages";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import ResetMessage from "./ResetMessage";
import PasswordErrorMessage from "./PasswordErrorMessage";
import GlobalMessage from "../src/components/common/GlobalMessage";
import { AlertProvider } from "../src/context/alertContext";
function App() {
  return (
    <AlertProvider>
      <Router>
        <GlobalMessage />
        <Route path="/app/reset/password" component={ResetPassword} />
        <Route path="/app/reset/message" component={ResetMessage} />
        <Route path="/app/forgot/password" component={ForgotPassword} />
        <Route
          path="/app/resetpassword/error"
          component={PasswordErrorMessage}
        />
      </Router>
    </AlertProvider>
  );
}

export default App;
