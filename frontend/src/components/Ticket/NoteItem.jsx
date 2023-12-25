import { calculateElapsedTime } from "../../utils/helperFunctions";
import ProfileIcon from "../common/ProfileIcon";

const NoteItem = ({ note }) => {
  return (
    <div className="mb-3 flex justify-between gap-3">
      <ProfileIcon />
      <div className="flex-1 rounded-md border-[1.3px] p-4 dark:border-zinc-700">
        <div className="mb-2 flex items-center justify-between">
          <span className=" font-semibold text-accentLightShade">
            {note.isAdmin ? "Support Desk" : "You"}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {calculateElapsedTime(note.updatedAt)}{" "}
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
