import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery("");
      }}
    >
      <input
        className="focus-yellow w-32 rounded-lg px-4 py-2 text-sm text-stone-800 transition-all duration-500 placeholder:text-stone-400 focus:w-36 sm:w-48 md:w-80 md:focus:w-96"
        placeholder="Search Order Number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
