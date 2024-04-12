import jwt from 'jsonwebtoken';

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

const verifyToken = (req, isJwt) => {
  try {
    const token = req.headers.get('authorization');
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
    );
    const id = decoded.id;
    return new Promise((resolve) => resolve(id));
  } catch (err) {
    if (isJwt) {
      throw err;
    }
  }
};

export const auth = {
  createAccessToken,
  verifyToken,
};
