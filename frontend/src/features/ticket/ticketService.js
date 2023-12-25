import instance from "../../axios/axiosInstance";

const TICKET_URL = "/api/tickets";

const createTicket = async (ticket) => {
  try {
    return await instance.post(TICKET_URL, ticket);
  } catch (error) {
    console.log(error?.response?.message);
  }
};

const getAllTickets = async () => {
  try {
    return await instance.get(TICKET_URL);
  } catch (error) {
    console.log(error?.response?.message);
  }
};

const getTicket = async (id) => {
  try {
    return await instance.get(`${TICKET_URL}/${id}`);
  } catch (error) {
    console.log(error?.response?.message);
  }
};

const closeTicket = async (id) => {
  try {
    return await instance.put(`${TICKET_URL}/${id}`, { status: "closed" });
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

export { createTicket, getAllTickets, getTicket, closeTicket };
