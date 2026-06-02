import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FetchNote } from "../services/noteService";
import type { Note, NoteParams } from "../types/note";
import { useDebouncedCallback } from "use-debounce";

type useLoudContentType = [Note[], number, (query: string) => void];
interface useLoudContentParams {
  page: NoteParams["page"];
  query?: string;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
}
export const useLoudContent = ({
  page,
  query,
  setQuery,
  setPage,
}: useLoudContentParams): useLoudContentType => {
  const updateQuery = useDebouncedCallback((query) => {
    setQuery(query);
    setPage(1);
  }, 300);
  const { data } = useQuery({
    queryKey: ["note", { page, query }],
    queryFn: () => FetchNote({ page, search: query }),
    enabled: true,
    placeholderData: keepPreviousData,
  });
  const notes = data?.notes || [];
  const totalPage = data?.totalPages || 1;
  return [notes, totalPage, updateQuery];
};
