export const errorHandler = (err, req, res, next) => {
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for mongo cast error
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found.';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    success: false,
  });

  next();
};
