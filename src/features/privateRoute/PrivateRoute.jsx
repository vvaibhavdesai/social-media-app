import { Route, Navigate } from "react-router"
import { useSelector } from "react-redux";

export function PrivateRoute({ path, ...props }) {
    const userData = useSelector(state=>state.users)
    console.log(path,"yeh meh hu path")
    return userData.token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/register" />
  );
}