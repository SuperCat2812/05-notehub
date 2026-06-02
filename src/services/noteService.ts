import axios from "axios";
import type { Note, NoteValue, TagValue } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
export interface Notes {
  notes: Note[];
  totalPages: number;
}
export interface NoteParams {
  search?: string;
  tag?: TagValue;
  page: number;
  perPage?: number;
  softBy?: "created" | "updated";
}
interface AxiosParams {
  params?: {
    search?: NoteParams["search"];
    tag?: NoteParams["tag"];
    page: NoteParams["page"];
    perPage?: NoteParams["search"];
    softBy?: NoteParams["softBy"];
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
  if (search) {
    const option: AxiosParams = {
      params: { page, search },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get<Notes>("/notes", option);
    return data;
  }
  const option: AxiosParams = {
    params: { page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get<Notes>("/notes", option);
  return data;
};
export const AddNote = async (noteData: NoteValue): Promise<Note> => {
  const option: AxiosParams = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post<Note>("/notes", noteData, option);
  return data;
};
export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const option: AxiosParams = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete<Note>(`/notes/${id}`, option);
  return data;
};
