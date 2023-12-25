import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SubHeader from "../common/SubHeader";
import { closeTicketThunk } from "../../features/ticket/ticketThunk";
import Divider from "../common/Divider";
import StyledText from "../common/StyledText";
import { statusColor } from "../../constants/statusColor";
import { defaultProductColors } from "../../constants/productColors";
import { calculateElapsedTime } from "../../utils/helperFunctions";
import Button from "../common/Button";
import { reset as ticketReset } from "../../features/ticket/ticketSlice";
import { toast } from "react-toastify";
import Spinner from "../common/spinner/Spinner";

const Ticket = ({ toggleModal }) => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();

  const [closeBtnLoading, setCloseBtnLoading] = useState(false);

  const {
    ticket,
    hasError,
    message,
    success: { closeTicketSuccess, getTicketSuccess },
  } = useSelector((state) => state.ticket);

  const handleCloseTicket = async () => {
    if (window.confirm("Are you sure want to close ticket?")) {
      setCloseBtnLoading(true);
      await dispatch(closeTicketThunk(ticketId));
      setCloseBtnLoading(false);
    } else {
      return;
    }
  };

  // effect when add ticket success
  useEffect(() => {
    if (closeTicketSuccess) {
      toast.success(message);
      dispatch(ticketReset());
    } else if (hasError) {
      toast.error(message);
      dispatch(ticketReset());
    }
  }, [closeTicketSuccess]);

  // reset ticket state
  useEffect(() => {
    getTicketSuccess && dispatch(ticketReset());
  }, [getTicketSuccess]);

  return (
    <section>
      <SubHeader className="text-xl">{ticket.description}</SubHeader>
      <p className="mb-1 font-medium">
        Ticket ID:{" "}
        <span className="text-gray-500 dark:text-gray-300">{ticket._id}</span>
      </p>
      <p className="font-medium">
        Created:{" "}
        <span className="text-gray-500 dark:text-gray-300">
          {calculateElapsedTime(ticket.createdAt)}
        </span>
      </p>
      <div className="mb-3 mt-3 flex flex-wrap gap-3 font-semibold text-gray-700">
        <StyledText bgColor={statusColor[ticket.status]}>
          {ticket?.status?.toUpperCase()}
        </StyledText>
        <StyledText bgColor={defaultProductColors[ticket.status]}>
          {ticket?.product?.toUpperCase()}
        </StyledText>
      </div>
      <Divider />
      <div className="my-4 flex flex-col-reverse justify-between sm:flex-row sm:items-center">
        <SubHeader className="text-xl">Notes</SubHeader>
        <div className="flex w-full max-w-[400px] gap-3">
          <Button
            disabled={ticket.status === "closed"}
            version="secondary"
            onClick={toggleModal}
          >
            Add Note
          </Button>
          <Button
            disabled={ticket.status === "closed"}
            onClick={handleCloseTicket}
          >
            {closeBtnLoading ? (
              <Spinner color="white" size={24} />
            ) : (
              "Close Ticket"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
