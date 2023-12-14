import asyncHandler from 'express-async-handler';
import readJsonData from '../utils/readJsonData.js';
import { responseMessage } from '../utils/responseMessage.js';
import { PRODUCTS_REF_TYPE, TICKET_STATUS_REF_TYPE } from '../constants.js';

const getRefByRefType = asyncHandler(async (req, res) => {
  const { refType } = req.query;

  if (refType) {
    if ([PRODUCTS_REF_TYPE, TICKET_STATUS_REF_TYPE].includes(refType)) {
      const products = await readJsonData(refType);

      res.status(200).json(responseMessage('', products));
    } else {
      res.status(400);
      throw new Error('Invalid refType');
    }
  } else {
    res.status(400);
    throw new Error('Missing refType parameter');
  }
});

export { getRefByRefType };
