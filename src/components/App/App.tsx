import { useState } from "react";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";

import { useModalClose } from "../../hooks/useModal";
import { useLoudContent } from "../../hooks/useLoudContent";
import { useDebounce } from "use-debounce";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [value] = useDebounce(query, 300);
  const [onModal, openModal, closeModal] = useModalClose();
  const [notes, totalPage] = useLoudContent({ page, value });
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            query={query}
            setQuery={setQuery}
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
