import { useState } from "react";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";

import { useModalClose } from "../../hooks/useModal";
import { useLoudContent } from "../../hooks/useLoudContent";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [onModal, openModal, closeModal] = useModalClose();
  const [notes, totalPage, updateQuery] = useLoudContent({
    page,
    query,
    setQuery,
    setPage,
  });
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            query={query}
            updateQuery={updateQuery}
          />

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
