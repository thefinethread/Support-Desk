import TicketItem from "../../components/TicketList/TicketItem";

const TicketList = ({ ticketList }) => {
  return (
    <section className="my-6 overflow-x-hidden rounded-md border border-b-0 border-gray-400/40">
      {ticketList.map((ticket) => (
        <TicketItem key={ticket._id} {...ticket} />
      ))}
    </section>
  );
};

export default TicketList;
