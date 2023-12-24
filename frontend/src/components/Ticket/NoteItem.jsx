import { calculateElapsedTime } from '../../utils/helperFunctions';
import ProfileIcon from '../common/ProfileIcon';

const NoteItem = ({ note }) => {
  return (
    <div className="mb-3 flex gap-3 justify-between">
      <ProfileIcon />
      <div className="border-[1.3px] flex-1 rounded-md p-4">
        <div className="mb-2  flex justify-between items-center">
          <span className=" text-accentLightShade font-semibold">
            {note.isAdmin ? 'Support Desk' : 'You'}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {calculateElapsedTime(note.updatedAt)}{' '}
          </span>
        </div>
        <p className="font-medium text-gray-600">{note.text}</p>
      </div>
    </div>
  );
};

export default NoteItem;
