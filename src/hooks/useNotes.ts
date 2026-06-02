import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../services/noteService";
import type { Note } from "../types/note";

type UseNoteType = [(id: Note["id"]) => void];
export const UseNote = (): UseNoteType => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["note"],
      });
    },
  });
  const handlerDelete = (id: Note["id"]) => {
    mutate(id);
  };
  return [handlerDelete];
};
