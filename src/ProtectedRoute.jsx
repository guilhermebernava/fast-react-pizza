import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const username = useSelector((store) => store.user.username);

  if (username == null) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default ProtectedRoute;
