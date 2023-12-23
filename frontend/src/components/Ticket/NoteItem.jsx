import { calculateElapsedTime } from '../../utils/helperFunctions';

const NoteItem = ({ note }) => {
  return (
    <div className="border-b-[1.5px] p-4">
      <div className="mb-2 flex justify-between items-center">
        <span className=" text-accentLightShade font-semibold">
          {note.isAdmin ? 'Support Desk' : 'You'}
        </span>
        <span className="text-xs font-medium text-gray-400">
          {calculateElapsedTime(note.updatedAt)}{' '}
        </span>
      </div>
      <p className="font-medium text-gray-600">{note.text}</p>
    </div>
  );
};

export default NoteItem;
