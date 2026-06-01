import { useState } from "react";

import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { FetchNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2hrYTI4MTIwNS5ibGVuZGVyQGdtYWlsLmNvbSIsImlhdCI6MTc4MDI1NjAwM30.5eXHi7pGGsyK1GpjsKJvuqXX8HO8An427Qf_3fm6TyQ"
// }
function App() {
  const [onModal, setOnModal] = useState(false);
  const [page, setPage] = useState(1);
  const openModal = () => {
    setOnModal(true);
  };
  const closeModal = () => {
    setOnModal(false);
  };
  const { data } = useQuery({
    queryKey: ["note"],
    queryFn: FetchNote,
    enabled: true,
    placeholderData: keepPreviousData,
  });
  const notes = data?.notes || [];
  const totalPage = data?.totalPages || 1;
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox />

          <button
            type="button"
            onClick={openModal}
            className={css.button}>
            Create Note
          </button>
        </header>
        {totalPage > 1 && (
          <Pagination
            handlePageClick={handleChangePage}
            pageCount={totalPage}
            currentPage={page}
          />
        )}
        {onModal && (
          <Modal onClose={closeModal}>
            <NoteForm closeModal={closeModal} />
          </Modal>
        )}
        <NoteList notes={notes} />
      </div>
    </>
  );
}

export default App;
