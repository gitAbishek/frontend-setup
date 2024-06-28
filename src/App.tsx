import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/Layout";

import PrivateRouteWrapper from "./layout/PrivateRouteWrapper";
import PublicRouteWrapper from "./layout/PublicRouteWrapper";
import { PATH } from "./constants/path";
import Login from "./pages/auth/Login";
// import { useAuthContext } from "./hooks/contextConsumer.hook";

const App = () => {
  // const { isLoggedIn } = useAuthContext();
  return (
    <div className="">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouteWrapper isLoggedIn={true} />}>
            <Route path="/*" element={<Layout />} />
          </Route>
          <Route element={<PublicRouteWrapper isLoggedIn={false} />}>
            <Route path={PATH.login} element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
