import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between gap-8 border-b border-stone-200 bg-yellow-500 px-4 py-3 sm:justify-center">
      <Link
        to="/"
        className="text-xs uppercase tracking-wide sm:text-sm sm:tracking-widest xl:text-xl"
      >
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
