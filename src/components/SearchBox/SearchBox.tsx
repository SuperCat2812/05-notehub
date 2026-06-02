import css from "./SearchBox.module.css";

interface SearchBoxParams {
  query: string;
  updateQuery: (query: string) => void;
}
export default function SearchBox({ query, updateQuery }: SearchBoxParams) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={(e) => updateQuery(e.target.value)}
    />
  );
}
