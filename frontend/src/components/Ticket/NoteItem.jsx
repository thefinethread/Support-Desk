import { calculateElapsedTime } from '../../utils/helperFunctions';
import ProfileIcon from '../common/ProfileIcon';

const NoteItem = ({ note }) => {
  return (
    <div className="mb-3 flex gap-3 justify-between">
      <ProfileIcon />
      <div className="border-[1.3px] dark:border-zinc-700 flex-1 rounded-md p-4">
        <div className="mb-2 flex justify-between items-center">
          <span className=" text-accentLightShade font-semibold">
            {note.isAdmin ? 'Support Desk' : 'You'}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {calculateElapsedTime(note.updatedAt)}{' '}
          </span>
        </div>
        <p className="font-medium text-gray-600 dark:text-zinc-200">
          {note.text}
        </p>
      </div>
    </div>
  );
};

export default NoteItem;
