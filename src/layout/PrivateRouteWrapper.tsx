import { Outlet, Navigate } from 'react-router-dom';
import { PATH } from '../constants/path';

interface PrivateRouteWrapperProps {
  isLoggedIn: boolean;
}

const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({
  isLoggedIn,
}) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.dashboard} />;
};

export default PrivateRouteWrapper;
