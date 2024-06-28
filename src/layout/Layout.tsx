// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import { PATH } from "../constants/path";
import Dashboard from "../pages/home/Dashboard";

const Layout = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <Main>
            <Routes>
              <Route path={PATH.dashboard} element={<Dashboard />} />
            </Routes>
          </Main>
        </div>
      </div>
    </>
  );
};

export default Layout;
