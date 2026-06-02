import axios from "axios";
import type { Note, NoteParams, Notes, NoteValue } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface AxiosParams {
  params?: {
    page: NoteParams["page"];
    search?: NoteParams["search"];
  };
  headers: {
    Authorization: string;
  };
}
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
export const FetchNote = async ({
  page,
  search,
}: NoteParams): Promise<Notes> => {
  const option: AxiosParams = {
    params: { page, search },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get<Notes>("/notes", option);
  return data;
};
export const AddNote = async (noteData: NoteValue): Promise<NoteValue> => {
  const option: AxiosParams = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post<Note>("/notes", noteData, option);
  return data;
};
export const deleteNote = async (id: Note["id"]): Promise<NoteValue> => {
  const option: AxiosParams = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete<Note>(`/notes/${id}`, option);
  return data;
};
