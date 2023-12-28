import { useDispatch, useSelector } from "react-redux";
import Notes from "../components/Ticket/Notes";
import Ticket from "../components/Ticket/Ticket";
import useModal from "../hooks/useModal";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTicketThunk } from "../features/ticket/ticketThunk";
import { reset as ticketReset } from "../features/ticket/ticketSlice";
import { getNotes, reset as resetNote } from "../features/note/noteSlice";
import FullPageSpinner from "../components/common/spinner/FullPageSpinner";
import Container from "../components/common/Container";
import Spinner from "../components/common/spinner/Spinner";

const TicketPage = () => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();

  const { loading: ticketLoading } = useSelector((state) => state.ticket);
  const { loading: noteLoading } = useSelector((state) => state.note);

  useEffect(() => {
    dispatch(getTicketThunk(ticketId));
    dispatch(getNotes(ticketId));

    return () => {
      dispatch(ticketReset());
      dispatch(resetNote());
    };
  }, []);

  const { isOpen, toggleModal } = useModal();

  return (
    <main className="relative z-10 flex-1">
      {ticketLoading ? (
        <FullPageSpinner />
      ) : (
        <Container>
          <div className=" mx-auto flex h-full max-w-md flex-col sm:max-w-3xl">
            <Ticket toggleModal={toggleModal} />
            {noteLoading ? (
              <Spinner />
            ) : (
              <Notes isModalOpen={isOpen} toggleModal={toggleModal} />
            )}
          </div>
        </Container>
      )}
    </main>
  );
};

export default TicketPage;
