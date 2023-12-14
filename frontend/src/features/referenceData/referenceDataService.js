import axios from 'axios';

const REF_URL = '/api/ref';

export const getRefService = async (type) => {
  return await axios.get(REF_URL, {
    params: {
      refType: type,
    },
  });
};
