import { useEffect, useRef } from "react";

export default function Search({ onSearch, search }) {
  const inputSearch = useRef(null);
  useEffect(() => {
    inputSearch.current.focus();
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        inputSearch.current.focus();
        onSearch("");
      }
    });
  }, []);
  return (
    <input
      onChange={(e) => onSearch(e.target.value)}
      type="text"
      placeholder="Search movies ..."
      className="search"
      value={search}
      ref={inputSearch}
    />
  );
}
