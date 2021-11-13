import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { UserProvider } from "../context/userContext";
import NavLayout from "../layouts/Nav";
import GlobalMessage from "../components/common/GlobalMessage";
import { AlertProvider } from "../context/alertContext";

export default function PrivatePages() {
  let { path } = useRouteMatch();

  return (
    <AlertProvider>
      <UserProvider>
        <GlobalMessage />
        <NavLayout>
          <Switch>
            
          </Switch>
        </NavLayout>
      </UserProvider>
    </AlertProvider>
  );
}
