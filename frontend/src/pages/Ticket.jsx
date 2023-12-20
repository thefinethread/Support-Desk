import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SubHeader from '../components/common/SubHeader';
const Ticket = () => {
  const { ticket, loading, hasError, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {}, []);

  return (
    <div>
      <SubHeader></SubHeader>
    </div>
  );
};

export default Ticket;
