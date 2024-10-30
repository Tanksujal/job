// PrivateRoute.jsx
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ user, children }) => {
  console.log(user);
  
  return user ? children : <Navigate to="/loginuser" replace />;
};

export default PrivateRoute;
