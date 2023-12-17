import { Link } from 'react-router-dom';
import { RiCircleFill, RiWechatLine } from 'react-icons/ri';
import { statusColor } from '../../constants/statusColor';

const ExtraInfo = ({ item }) => {
  return (
    <div className="flex items-center gap-1 font-medium text-gray-500">
      <RiCircleFill size="5px" color="gray" />
      {item}
    </div>
  );
};

const TicketItem = ({ ...ticket }) => {
  return (
    <Link to={ticket._id}>
      <div className="border-b border-gray-400/40 py-4 px-5 hover:bg-gray-400/30  transition-colors cursor-pointer">
        <div className="flex flex-wrap gap-2 font-semibold text-gray-700 mb-3">
          <div className="text-sm">{ticket.description}</div>
          <span
            className={`text-white text-[9px] rounded-sm tracking-wide px-2 ${
              statusColor[ticket.status]
            }`}
          >
            {ticket.status.toUpperCase()}
          </span>
        </div>
        <div className="flex gap-4 text-xs">
          <ExtraInfo item={ticket.product} />
          <ExtraInfo item={ticket.createdAt.slice(0, 7)} />
          <div className="flex items-center gap-1 font-medium text-gray-500">
            <RiWechatLine size="18px" />
            <span className="text-black">5 comments</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TicketItem;
