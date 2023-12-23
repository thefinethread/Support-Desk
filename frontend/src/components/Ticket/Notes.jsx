import NoteItem from './NoteItem';
import { NOTES_ERR_MSG, NO_NOTES_MSG } from '../../constants/constants';

const ErrorMessage = ({ msg }) => {
  return <p className="text-base font-semibold text-gray-500">{msg}</p>;
};

const Notes = ({ notes, hasError }) => {
  if (hasError) {
    return <ErrorMessage msg={NOTES_ERR_MSG} />;
  }
  if (notes?.length === 0) {
    return <ErrorMessage msg={NO_NOTES_MSG} />;
  }

  return (
    <div className="self-start w-full pb-4">
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
};

export default Notes;
