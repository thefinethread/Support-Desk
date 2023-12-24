import { firstLetterOfName } from '../../utils/helperFunctions';

const ProfileIcon = ({ letter }) => {
  return (
    <div className="border font-semibold text-white bg-orange-400 flex items-center justify-center h-9 w-9 rounded-full">
      {firstLetterOfName()}
    </div>
  );
};

export default ProfileIcon;
