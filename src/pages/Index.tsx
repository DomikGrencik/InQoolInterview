import { Link } from "@tanstack/react-router";
import { FC } from "react";

const Index: FC = () => {
  return (
    <div>
      <div className="block">
        <div className=" container alignment alignment-center">
          <p className="label">
            <b className="color-font-light">InQool Frontend Interview</b>{" "}
            project by <b className="color-font-light">Dominik Grenčík</b>
          </p>
          <p className="text-align-center">
            Navigate to the pages{" "}
            <Link className="item" to="/users">
              Users
            </Link>{" "}
            and{" "}
            <Link className="item" to="/animals">
              Animals
            </Link>{" "}
            to see completed tasks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
