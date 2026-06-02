import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FetchNote } from "../services/noteService";
import type { Note, NoteParams } from "../types/note";

type useLoudContentType = [Note[], number];
interface useLoudContentParams {
  page: NoteParams["page"];
  value?: string;
}
export const useLoudContent = ({
  page,
  value,
}: useLoudContentParams): useLoudContentType => {
  const { data } = useQuery({
    queryKey: ["note", { page, value }],
    queryFn: () => FetchNote({ page, search: value }),
    enabled: true,
    placeholderData: keepPreviousData,
  });
  const notes = data?.notes || [];
  const totalPage = data?.totalPages || 1;
  return [notes, totalPage];
};
