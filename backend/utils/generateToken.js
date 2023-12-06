import jwt from 'jsonwebtoken';

const generateToken = (res, user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  res.cookie('RememberMe', token, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
};

export { generateToken };
