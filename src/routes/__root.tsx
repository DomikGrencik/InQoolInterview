import Footer from "@components/Footer";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="site-alignment">
      <div className="navbar">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/users">
          Users
        </Link>
        <Link className="item" to="/animals">
          Animals
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
      <Footer />
    </div>
  ),
});
