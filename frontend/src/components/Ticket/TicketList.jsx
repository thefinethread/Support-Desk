import TicketItem from './TicketItem';

const TicketList = ({ ticketList }) => {
  return (
    <section>
      {ticketList.map((ticket) => (
        <TicketItem key={ticket.id} {...ticket} />
      ))}
    </section>
  );
};

export default TicketList;
