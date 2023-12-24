import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { createNoteThunk, getNotes } from '../../features/note/noteSlice';
import { reset as noteReset } from '../../features/note/noteSlice';
import Modal from '../common/modal/Modal';
import SubHeader from '../common/SubHeader';
import Button from '../common/Button';
import Spinner from '../common/spinner/Spinner';
import NoteItem from './NoteItem';
import { NOTES_ERR_MSG, NO_NOTES_MSG } from '../../constants/constants';

const Notes = ({ modalIsOpen, toggleModal }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState('');
  const [addNoteLoading, setAddNoteLoading] = useState(false);

  const {
    notes,
    loading,
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

    dispatch(createNoteThunk({ ticketId: id, noteData: { text: noteText } }));
  };

  useEffect(() => {
    if (getNotesSuccess) {
      dispatch(noteReset());
    }
  }, [getNotesSuccess]);

  useEffect(() => {
    dispatch(getNotes(id));
  }, []);

  // effect after note add success
  useEffect(() => {
    if (addNoteSuccess) {
      setAddNoteLoading(false);
      toast.success(message);
      setNoteText('');
      toggleModal();
      dispatch(noteReset());
    } else if (hasError) {
      toast.error(message);
      dispatch(noteReset());
    }
  }, [addNoteSuccess]);

  return (
    <>
      <Modal isOpen={modalIsOpen}>
        <div className="bg-white p-6 rounded-md relative min-w-[340px] sm:w-[500px]">
          <SubHeader className="text-xl">Add Note</SubHeader>
          <button
            onClick={toggleModal}
            className="absolute right-2 top-2 text-gray-400 hover:text-black"
          >
            <RiCloseLine size="1.4rem" />
          </button>
          <form className="w-full" onSubmit={handleAddNote}>
            <textarea
              id="description"
              placeholder="add note"
              value={noteText}
              required={true}
              onChange={(e) => setNoteText(e.target.value)}
              className={`w-full outline-none mb-3 p-2 rounded-md outline-1 outline-gray-300 outline-offset-0 focus:outline-secondaryLightShade focus:shadow-custom`}
            ></textarea>
            <Button type="submit">
              {addNoteLoading ? <Spinner color="white" size={24} /> : 'Submit'}
            </Button>
          </form>
        </div>
      </Modal>

      {/* notes section */}
      {loading ? (
        <Spinner />
      ) : hasError ? (
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

const ErrorMessage = ({ msg }) => {
  return <p className="text-base font-semibold text-gray-500">{msg}</p>;
};

export default Notes;
