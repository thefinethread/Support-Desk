import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTicketsThunk } from '../features/ticket/ticketThunk';
import Container from '../components/common/Container';
import Spinner from '../components/common/Spinner';
import Divider from '../components/common/Divider';
import SubHeader from '../components/common/SubHeader';
import TicketList from '../components/Ticket/TicketList';

const Tickets = () => {
  const dispatch = useDispatch();

  const { tickets, loading, hasError, success, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    dispatch(getAllTicketsThunk());
  }, []);

  return (
    <main className="relative flex-1 z-10">
      {loading ? (
        <div className="absolute h-full w-full">
          <Spinner size={50} className="flex-col">
            Fetching your tickets. Please wait...
          </Spinner>
        </div>
      ) : (
        <Container>
          <div className=" h-full max-w-md sm:max-w-3xl mx-auto ">
            <SubHeader>Your Tickets</SubHeader>
            <Divider />
            <TicketList ticketList={tickets} />
          </div>
        </Container>
      )}
    </main>
  );
};

export default Tickets;
