import css from "./SearchBox.module.css";

interface SearchBoxParams {
  query: string;
  setQuery: (query: string) => void;
}
export default function SearchBox({ query, setQuery }: SearchBoxParams) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
