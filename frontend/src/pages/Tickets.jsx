import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTicketsThunk } from '../features/ticket/ticketThunk';
import Container from '../components/common/Container';
import Divider from '../components/common/Divider';
import SubHeader from '../components/common/SubHeader';
import TicketList from '../components/TicketList/TicketList';
import { reset } from '../features/ticket/ticketSlice';
import { toast } from 'react-toastify';
import FullPageSpinner from '../components/common/spinner/FullPageSpinner';

const Tickets = () => {
  const dispatch = useDispatch();

  const { tickets, loading, hasError, success, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    return () => {
      if (success) {
        dispatch(reset());
      }
    };
  }, [success]);

  useEffect(() => {
    dispatch(getAllTicketsThunk());
  }, []);

  useEffect(() => {
    if (hasError && message) {
      toast.error(message);
    }
  }, [hasError, message]);

  return (
    <main className="relative flex-1 z-10">
      {loading ? (
        <FullPageSpinner size={50} className="flex-col">
          Loading, Please wait...
        </FullPageSpinner>
      ) : (
        <Container>
          <div className=" h-full max-w-md sm:max-w-3xl mx-auto ">
            <SubHeader>Your Tickets</SubHeader>
            <Divider />
            {tickets ? (
              <TicketList ticketList={tickets} />
            ) : (
              <p>You have not created any tickets.</p>
            )}
          </div>
        </Container>
      )}
    </main>
  );
};

export default Tickets;
