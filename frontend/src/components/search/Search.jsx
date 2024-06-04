import SearchIcon from "../icons/SearchIcon";
import PropTypes from "prop-types";
const Search = ({ setSearch, className }) => {
  return (
    <div className="relative">
      <input
        name="search"
        id="search"
        onChange={setSearch}
        placeholder="Tìm kiếm"
        className={`pl-4 pr-12 py-4 rounded-xl border border-gray-500 outline-none ${className}`}
      ></input>
      <span className="absolute right-0 -translate-x-5 top-1/2 -translate-y-1/2">
        <SearchIcon></SearchIcon>
      </span>
    </div>
  );
};

Search.propTypes = {
  setSearch: PropTypes.func,
  className: PropTypes.string,
};
export default Search;
