import { Link, useResolvedPath, useMatch } from "react-router-dom";
export function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <>
      <Link to={to} {...props}>
        <button>
          <i
            className={match ? "active-route-icon icons" : "m-nav-icons icons"}
          >
            {children}
          </i>
        </button>
      </Link>
    </>
  );
}
