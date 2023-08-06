import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.User);
  const navigate = useNavigate();
  return isAuthenticated !== true ? children : navigate("/");
};

export default PublicRoute;
