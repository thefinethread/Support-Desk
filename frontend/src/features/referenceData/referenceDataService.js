import instance from '../../axios/axiosInstance';

const REF_URL = '/api/ref';

const getRefService = async (type) => {
  try {
    return await instance.get(REF_URL, {
      params: {
        refType: type,
      },
    });
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

export { getRefService };
