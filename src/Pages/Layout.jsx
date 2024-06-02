import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Your layout components like header, sidebar, etc. */}
      <Outlet />
    </div>
  );
};

export default Layout;
