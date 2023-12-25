import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTicketsThunk } from "../features/ticket/ticketThunk";
import Container from "../components/common/Container";
import SubHeader from "../components/common/SubHeader";
import TicketList from "../features/auth/TicketList";
import { reset } from "../features/ticket/ticketSlice";
import { toast } from "react-toastify";
import FullPageSpinner from "../components/common/spinner/FullPageSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const Tickets = () => {
  const dispatch = useDispatch();

  const {
    tickets,
    loading,
    hasError,
    success: { getTicketsSuccess },
    message,
  } = useSelector((state) => state.ticket);

  useEffect(() => {
    return () => {
      if (getTicketsSuccess) {
        dispatch(reset());
      }
    };
  }, [getAllTicketsThunk]);

  // fetch all tickets when component mounts
  useEffect(() => {
    dispatch(getAllTicketsThunk());
  }, []);

  useEffect(() => {
    if (hasError && message) {
      toast.error(message);
    }
  }, [hasError]);

  return (
    <main className="relative z-10 flex-1">
      {loading ? (
        <FullPageSpinner size={50} className="flex-col">
          Loading, Please wait...
        </FullPageSpinner>
      ) : (
        <Container>
          <div className=" mx-auto h-full max-w-md sm:max-w-3xl ">
            <SubHeader>Your Tickets</SubHeader>
            {tickets.length !== 0 ? (
              <TicketList ticketList={tickets} />
            ) : (
              <ErrorMessage msg="You do not have any tickets." />
            )}
          </div>
        </Container>
      )}
    </main>
  );
};

export default Tickets;
