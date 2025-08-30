import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";

export interface FetchNotesResponse { notes: Note[]; totalPages: number; }
export interface FetchNotesOptions { search?: string; tag?: NoteTag; sortBy?: string; }
export type CreateNoteInput = Omit<Note, "id" | "createdAt" | "updatedAt">;

export async function fetchNotes(
  page: number,
  perPage: number,
  options?: FetchNotesOptions,
  signal?: AbortSignal
): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, ...options },
    signal,
  });
  return data;
}

export async function fetchNoteById(id: string | number, signal?: AbortSignal): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, { signal });
  return data;
}

export async function createNote(newNote: CreateNoteInput): Promise<Note> {
  const { data } = await api.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: string | number): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}