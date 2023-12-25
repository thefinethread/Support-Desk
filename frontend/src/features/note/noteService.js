import instance from "../../axios/axiosInstance";

const API_URL = "/api/tickets";

const getTicketNotes = async (ticketId) => {
  try {
    return await instance.get(`${API_URL}/${ticketId}/notes`);
  } catch (error) {
    const message = error?.response?.data?.message;
    console.log(message);
  }
};

const createNote = async (ticketId, noteData) => {
  try {
    return await instance.post(`${API_URL}/${ticketId}/notes`, noteData);
  } catch (error) {
    const message = error?.response?.data?.message;
    console.log(message);
  }
};

export { getTicketNotes, createNote };
