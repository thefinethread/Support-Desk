import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTicketsThunk } from '../features/ticket/ticketThunk';

const Tickets = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTicketsThunk());
  }, []);

  return (
    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo doloribus
      recusandae ipsum temporibus, ab minus quae voluptatem magni delectus
      nobis.
    </div>
  );
};

export default Tickets;
