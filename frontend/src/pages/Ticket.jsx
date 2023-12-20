import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SubHeader from '../components/common/SubHeader';
import { getTicketThunk } from '../features/ticket/ticketThunk';
const Ticket = () => {
  const { ticket, loading, hasError, message } = useSelector(
    (state) => state.ticket
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    dispatch(getTicketThunk(id));
  }, []);

  return (
    <div>
      <SubHeader></SubHeader>
    </div>
  );
};

export default Ticket;
