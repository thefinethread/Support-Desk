import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
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
import { reset as ticketReset } from '../features/ticket/ticketSlice';
import { reset as noteReset } from '../features/note/noteSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/common/spinner/Spinner';
import { getNotes } from '../features/note/noteSlice';
import Notes from '../components/Ticket/Notes';
import Modal from '../components/common/modal/Modal';
import useModal from '../hooks/useModal';

const Ticket = () => {
  const {
    ticket,
    loading: ticketLoading,
    hasError: ticketError,
    message: ticketMessage,
    success: ticketSuccess,
  } = useSelector((state) => state.ticket);
  const noteState = useSelector((state) => state.note);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [closeBtnLoading, setCloseBtnLoading] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { isOpen, toggleModal } = useModal();

  const handleCloseTicket = () => {
    if (window.confirm('Are you sure want to close ticket?')) {
      setCloseBtnLoading(true);
      dispatch(closeTicketThunk(id));
    } else {
      return;
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!noteText.trim()) {
      toast.info('Text field is required');
      return;
    }
  };

  useEffect(() => {
    if (ticketSuccess && ticketMessage) {
      toast.success(ticketMessage);
      dispatch(ticketReset());
      setCloseBtnLoading(false);
    }
  }, [ticketSuccess, ticketMessage]);

  useEffect(() => {
    dispatch(getTicketThunk(id));
    dispatch(getNotes(id));
    console.log('unmount');

    return () => {
      dispatch(ticketReset());
      dispatch(noteReset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    ticketError && ticketMessage && toast.error(ticketMessage);
  }, [ticketError]);

  return (
    <main className="relative flex-1 z-10">
      {ticketLoading && !closeBtnLoading ? (
        <FullPageSpinner />
      ) : (
        <Container className="absolute left-0 right-0">
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
                    onClick={toggleModal}
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

            {/* modal for add note */}
            <Modal isOpen={isOpen}>
              <div className="bg-white p-6 rounded-md relative min-w-[340px] sm:w-[500px]">
                <SubHeader className="text-xl">Add Note</SubHeader>
                <button
                  onClick={toggleModal}
                  className="absolute right-2 top-2 text-gray-400 hover:text-black"
                >
                  <RiCloseLine size="1.4rem" />
                </button>
                <form className="w-full" onSubmit={handleAddNote}>
                  <textarea
                    id="description"
                    placeholder="add note"
                    value={noteText}
                    required={true}
                    onChange={(e) => setNoteText(e.target.value)}
                    className={`w-full outline-none mb-3 p-2 rounded-md outline-1 outline-gray-300 outline-offset-0 focus:outline-secondaryLightShade focus:shadow-custom`}
                  ></textarea>
                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </Modal>

            {/* notes section */}
            <section className="flex-1 flex items-center justify-center">
              {noteState.loading ? <Spinner /> : <Notes {...noteState} />}
            </section>
          </div>
        </Container>
      )}
    </main>
  );
};

export default Ticket;
