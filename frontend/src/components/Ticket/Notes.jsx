import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { createNoteThunk } from "../../features/note/noteSlice";
import { reset as noteReset } from "../../features/note/noteSlice";
import Modal from "../common/modal/Modal";
import SubHeader from "../common/SubHeader";
import Button from "../common/Button";
import Spinner from "../common/spinner/Spinner";
import NoteItem from "./NoteItem";
import ErrorMessage from "../common/ErrorMessage";
import { NOTES_ERR_MSG, NO_NOTES_MSG } from "../../constants/constants";

const Notes = ({ isModalOpen, toggleModal }) => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState("");
  const [addNoteLoading, setAddNoteLoading] = useState(false);

  const {
    notes,
    hasError,
    message,
    success: { addNote: addNoteSuccess, getNotes: getNotesSuccess },
  } = useSelector((state) => state.note);

  const handleAddNote = async (e) => {
    e.preventDefault();
    setAddNoteLoading(true);

    if (!noteText.trim()) {
      toast.info("Text field is required");
      return;
    }

    await dispatch(createNoteThunk({ ticketId, noteData: { text: noteText } }));

    setAddNoteLoading(false);
  };

  useEffect(() => {
    getNotesSuccess && dispatch(noteReset());
  }, [getNotesSuccess]);

  // effect after note add success
  useEffect(() => {
    if (addNoteSuccess) {
      toast.success(message);
      setNoteText("");
      toggleModal();
      dispatch(noteReset());
    } else if (hasError) {
      toast.error(message);
      dispatch(noteReset());
    }
  }, [addNoteSuccess, hasError]);

  return (
    <>
      <Modal isOpen={isModalOpen}>
        <div className="relative min-w-[340px] rounded-md bg-white p-6 dark:border dark:border-gray-500 dark:bg-zinc-900 dark:shadow-[0_0_9px_rgba(0,0,0,0.8)] sm:w-[500px]">
          <button
            onClick={toggleModal}
            className="absolute right-2 top-2 text-gray-400 hover:text-black dark:hover:text-zinc-50"
          >
            <RiCloseLine size="1.4rem" />
          </button>

          <SubHeader className="text-xl">Add Note</SubHeader>
          <form className="my-2 w-full" onSubmit={handleAddNote}>
            <textarea
              id="description"
              placeholder="add note"
              value={noteText}
              required={true}
              onChange={(e) => setNoteText(e.target.value)}
              className={`mb-5 w-full rounded-md p-2 outline-none outline-1 outline-offset-0 outline-gray-300 focus:shadow-custom focus:outline-secondaryLightShade dark:bg-zinc-800 dark:outline-zinc-700 dark:focus:shadow-darkCustom`}
            ></textarea>
            <Button type="submit">
              {addNoteLoading ? <Spinner color="white" size={24} /> : "Submit"}
            </Button>
          </form>
        </div>
      </Modal>
      {/* notes section */}
      {hasError ? (
        <ErrorMessage msg={NOTES_ERR_MSG} />
      ) : notes.length === 0 ? (
        <ErrorMessage msg={NO_NOTES_MSG} />
      ) : (
        <div className="w-full self-start pb-4">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
