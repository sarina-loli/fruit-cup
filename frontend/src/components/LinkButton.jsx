import { Link } from "react-router-dom";

export default function LinkButton({ to, children, className = "" }) {
  return (
    <Link to={to} className={`button ${className}`.trim()}>
      {children}
    </Link>
  );
}
