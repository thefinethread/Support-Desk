import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { createNoteThunk } from '../../features/note/noteSlice';
import { reset as noteReset } from '../../features/note/noteSlice';
import Modal from '../common/modal/Modal';
import SubHeader from '../common/SubHeader';
import Button from '../common/Button';
import Spinner from '../common/spinner/Spinner';
import NoteItem from './NoteItem';
import ErrorMessage from '../common/ErrorMessage';
import { NOTES_ERR_MSG, NO_NOTES_MSG } from '../../constants/constants';

const Notes = ({ isModalOpen, toggleModal }) => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState('');
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
      toast.info('Text field is required');
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
      setNoteText('');
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
        <div className="bg-white dark:bg-zinc-900 dark:border dark:border-gray-500 dark:shadow-[0_0_9px_rgba(0,0,0,0.8)] p-6 rounded-md relative min-w-[340px] sm:w-[500px]">
          <button
            onClick={toggleModal}
            className="absolute right-2 top-2 text-gray-400 hover:text-black dark:hover:text-zinc-50"
          >
            <RiCloseLine size="1.4rem" />
          </button>

          <SubHeader className="text-xl">Add Note</SubHeader>
          <form className="w-full my-2" onSubmit={handleAddNote}>
            <textarea
              id="description"
              placeholder="add note"
              value={noteText}
              required={true}
              onChange={(e) => setNoteText(e.target.value)}
              className={`w-full outline-none mb-5 p-2 dark:bg-zinc-800 rounded-md outline-1 outline-gray-300 dark:outline-zinc-700 outline-offset-0 focus:outline-secondaryLightShade focus:shadow-custom dark:focus:shadow-darkCustom`}
            ></textarea>
            <Button type="submit">
              {addNoteLoading ? <Spinner color="white" size={24} /> : 'Submit'}
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
        <div className="self-start w-full pb-4">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
