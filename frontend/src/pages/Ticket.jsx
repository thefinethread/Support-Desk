import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SubHeader from '../components/common/SubHeader';
import {
  closeTicketThunk,
  getTicketThunk,
} from '../features/ticket/ticketThunk';
import FullPageSpinner from '../components/common/spinner/FullPageSpinner';
import Container from '../components/common/Container';
import Divider from '../components/common/Divider';
import StyledText from '../components/common/StyledText';
import { statusColor } from '../constants/statusColor';
import { defaultProductColors } from '../constants/productColors';
import { calculateElapsedTime } from '../utils/helperFunctions';
import Button from '../components/common/Button';
import { reset } from '../features/ticket/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/common/spinner/Spinner';

const Ticket = () => {
  const { ticket, loading, hasError, message, success } = useSelector(
    (state) => state.ticket
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const [closeBtnLoading, setCloseBtnLoading] = useState(false);

  const handleCloseTicket = () => {
    setCloseBtnLoading(true);
    dispatch(closeTicketThunk(id));
  };

  useEffect(() => {
    if (success && message) {
      toast.success(message);
      dispatch(reset());
      setCloseBtnLoading(false);
    }
  }, [success, message]);

  useEffect(() => {
    dispatch(getTicketThunk(id));

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    hasError && message && toast.error(message);
  }, [hasError]);

  return (
    <main className="relative flex-1 z-10">
      {loading && !closeBtnLoading ? (
        <FullPageSpinner />
      ) : (
        <Container className="absolute">
          <div className=" h-full max-w-md sm:max-w-3xl mx-auto flex flex-col">
            <section>
              <SubHeader className="text-xl">{ticket.description}</SubHeader>
              <p className="font-medium mb-1">
                Ticket ID: <span className="text-gray-500">{ticket._id}</span>
              </p>
              <p className="font-medium">
                Created:{' '}
                <span className="text-gray-500">
                  {calculateElapsedTime(ticket.createdAt)}
                </span>
              </p>
              <div className="flex mt-3 flex-wrap gap-3 font-semibold text-gray-700 mb-3">
                <StyledText bgColor={statusColor[ticket.status]}>
                  {ticket?.status?.toUpperCase()}
                </StyledText>
                <StyledText bgColor={defaultProductColors[ticket.status]}>
                  {ticket?.product?.toUpperCase()}
                </StyledText>
              </div>
              <Divider />
              <div className="flex flex-col-reverse sm:flex-row my-4 justify-between sm:items-center">
                <SubHeader className="text-xl">Notes</SubHeader>
                <div className="w-full max-w-[400px] flex gap-3">
                  <Button
                    disabled={ticket.status === 'closed'}
                    version="secondary"
                  >
                    Add Note
                  </Button>
                  <Button
                    disabled={ticket.status === 'closed'}
                    onClick={handleCloseTicket}
                  >
                    {closeBtnLoading ? (
                      <Spinner color="white" size={24} />
                    ) : (
                      'Close Ticket'
                    )}
                  </Button>
                </div>
              </div>
            </section>
            <section className="flex-1"></section>
          </div>
        </Container>
      )}
    </main>
  );
};

export default Ticket;
