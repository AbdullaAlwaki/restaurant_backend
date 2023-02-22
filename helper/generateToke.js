import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const generateToken = (user) => {
  const payload = { id: user._id };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
};

const isAuthorized = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);

  if (!token) {
    return res
      .status(403)
      .json({ msg: "you're not authorized , you should signup" });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  console.log(decoded);
  req.user = decoded.id;
  next();
};

export default { generateToken, isAuthorized };
