export const responseMessage = (message, data) => {
  return {
    message: message || 'OK',
    data,
  };
};
