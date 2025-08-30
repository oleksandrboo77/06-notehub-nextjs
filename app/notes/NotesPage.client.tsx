"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, type FetchNotesResponse } from "../../lib/api/notes";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import NoteList from "../../components/NoteList/NoteList";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

export default function NotesPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSetSearch = useDebouncedCallback((v: string) => {
    setSearchQuery(v.trim());
    setPage(1);
  }, 300);

  const { data, isLoading, isError, error, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, perPage, searchQuery],
    queryFn: ({ signal }) => fetchNotes(page, perPage, { search: searchQuery }, signal),
    placeholderData: (prev) => prev, // плавная пагинация без мерцания
  });

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onSearch={debouncedSetSearch} />
        {data && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
        {isFetching && <span className={css.updating}>Updating…</span>}
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not fetch the list of notes. {(error as Error).message}</p>}
      {data && !isLoading && data.notes.length === 0 && <p>No notes found</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
