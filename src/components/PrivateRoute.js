import { useRouter } from "next/router";
import { Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const token = JSON.parse(sessionStorage.getItem("authtoken"));
  const router = useRouter();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (true) {
          return <Component {...props} />;
        }

        router.push("/");
        return null;
      }}
    />
  );
}

export default PrivateRoute;
