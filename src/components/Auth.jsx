import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function Auth() {
    const user = useSelector(state => state.auth.currentUser);
    const location = useLocation();
    return (
        user
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location.pathname }} replace />
    );
}