import TicketItem from './TicketItem';

const TicketList = ({ ticketList }) => {
  return (
    <section className="my-6 border border-b-0 overflow-x-hidden border-gray-400/40 rounded-md">
      {ticketList.map((ticket) => (
        <TicketItem key={ticket._id} {...ticket} />
      ))}
    </section>
  );
};

export default TicketList;
