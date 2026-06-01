export interface Notes {
  notes: Note[];
  totalPages: number;
}
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

type TagValue = "Todo" | "Work" | "Shopping" | "Meeting" | "Personal";

export interface NoteParams {
  search: string;
  tag: TagValue;
  page: number;
  perPage: number;
  softBy: "created" | "updated";
}
export interface NoteValue {
  title: string;
  content: string;
  tag: Note["tag"];
}
