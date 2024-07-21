import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="container alignment alignment-center">
        <p>
          Project is created using{" "}
          <a className="link link-react" href="https://react.dev/">
            React
          </a>{" "}
          and{" "}
          <a className="link link-ts" href="https://www.typescriptlang.org/">
            TypeScript
          </a>
        </p>
        <div className="footer-alignment">
          <div className="group group-end">
            <p>Styles</p>
            <p>Data validation</p>
            <p>Routing</p>
            <p>API requests</p>
            <p>Table component</p>
            <p>Form component</p>
          </div>
          <div className="bar-vertical"></div>
          <div className="group group-start">
            <a className="link link-scss" href="https://sass-lang.com/">
              SCSS
            </a>
            <a className="link link-zod" href="https://zod.dev/">
              Zod
            </a>
            <a
              className="link link-tanStack-router"
              href="https://tanstack.com/router/latest"
            >
              TanStack Router
            </a>
            <a
              className="link link-tanStack-query"
              href="https://tanstack.com/query/latest"
            >
              TanStack Query
            </a>
            <a
              className="link link-tanStack-table"
              href="https://tanstack.com/table/latest"
            >
              TanStack Table
            </a>
            <a
              className="link link-tanStack-form"
              href="https://tanstack.com/form/latest"
            >
              TanStack Form
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
