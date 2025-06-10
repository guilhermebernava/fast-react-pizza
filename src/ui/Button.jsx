import { Link } from "react-router-dom";

function Button({
  children,
  disabled,
  to,
  isSmall = false,
  noBackground = false,
}) {
  let className =
    "rounded-lg px-3 py-2 font-medium uppercase tracking-wide transform transition hover:scale-105 focus-yellow active:opacity-70 disabled:cursor-not-allowed";

  if (isSmall) className += " text-xs px-2 py-1.5";

  if (noBackground) {
    className +=
      " border-2 border-stone-300 bg-transparent hover:font-bold hover:text-stone-200 text-stone-800 hover:bg-red-500 focus-stone-200";
  } else {
    className += " bg-yellow-700 text-white";
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
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export default Button;
