import { Link } from "react-router-dom";

function Button({
  children,
  disabled,
  to,
  onClick,
  isSmall = false,
  noBackground = false,
}) {
  let className =
    "rounded-lg px-3 py-2 font-medium uppercase tracking-wide transform transition hover:scale-105 focus-yellow active:opacity-70 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed bg-yellow-400 disabled:hover:scale-100";

  if (isSmall) className += " text-xs px-2 py-1.5";

  if (noBackground) {
    className +=
      " bg-transparent border-2 border-stone-300 hover:font-bold hover:text-stone-200 text-stone-800 hover:bg-red-500 focus-stone-200";
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`transform transition hover:scale-105 ${className} focus-stone-200`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
