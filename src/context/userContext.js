import React, { useEffect, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { getSelf } from "../api/user";

import { useRouter } from "next/router";


export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authtoken] = useSessionStorage("authtoken");

  useEffect(() => {
    if (authtoken) {
      grabUser();
    }
  }, [authtoken]);

  const grabUser = async () => {
    const resp = await getSelf();
    const userresp = resp.user;
    if (userresp) {
      setUser({ ...userresp });

      return userresp;
    }

    return {};
  };

  const handleUser = (obj) => {
    setUser({ ...user, ...obj });
  };



  return (
    <UserContext.Provider
      value={{
        user,
        handleUser,
        grabUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
