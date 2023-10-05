import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export const tokenSign = async (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

export const checkToken = async (TokenSesion) => {
  try {
    return jwt.verify(TokenSesion, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const validateAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ").pop();
      const tokenData = await checkToken(token);
      console.log("TokenData ", tokenData);
      if (tokenData) {
        next();
      } else {
        res.status(409);
        res.send({ error: "No autorizado" });
      }
    } else {
      res.status(409);
      res.send({ error: "No Autorizado" });
    }
  } catch (error) {
    console.log(error);
  }
};
