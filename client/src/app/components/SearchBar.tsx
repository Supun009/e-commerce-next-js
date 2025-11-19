import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-md ring ring-gray-200 px-2 py-1 shadow-md">
      <Search className="w-4 h-4 text-gray-500" />
      <input
        type="text"
        placeholder="Search"
        id="search"
        className="text-sm outline-0"
      />
    </div>
  );
}
