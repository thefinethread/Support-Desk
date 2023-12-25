import { firstLetterOfName } from "../../utils/helperFunctions";

const ProfileIcon = ({ letter }) => {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-orange-400 font-semibold text-white">
      {firstLetterOfName()}
    </div>
  );
};

export default ProfileIcon;
