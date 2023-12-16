import instance from '../../axios/axiosInstance';

const TICKET_URL = '/api/tickets';

const createTicket = async (ticket) => {
  try {
    return await instance.post(TICKET_URL, ticket);
  } catch (error) {
    console.log(error?.response?.message);
  }
};

export { createTicket };
