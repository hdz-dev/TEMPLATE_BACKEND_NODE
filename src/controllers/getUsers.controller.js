/************* CONTROLADOR USER ******************/

// importa logica de el dominio
import { prisma } from "../database.js";
import {
  encryptPassword,
  comparePassword,
  tokenSign,
} from "../domain/crypto.js";

import { resp } from "../domain/genRes.js";

import { v4 as uuidv4 } from "uuid";

// exporta logica para los diferentes CRUD endpoints

//obtiene todos

export const getUsers = async (req, res) => {
  try {
    const Users = await prisma.users.findMany({
      select: {
        createdAt: true, // Incluir el campo field1 en los resultados
        id: true,
        email: true,
        username: true,
        documentID: true,
        role: true,
        avatar: true,
      },
    });

    console.log(Users);

    res.json(Users);
  } catch (error) {
    res.json({ error });
  }
};

//obtiene uno

export const getUser = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const User = await prisma.users.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(User);
  } catch (error) {
    res.json(error);
    next(error);
  }
};

//agrega uno

export const addUser = async (req, res, next) => {
  try {
    const { email, username, documentID, role, avatar, password } = req.body;

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User ya existe" });
    }

    const id = uuidv4(); // Genera un identificador único

    const encryptedPassword = await encryptPassword(password);

    const newUser = await prisma.users.create({
      data: {
        id,
        email,
        username,
        documentID,
        role,
        avatar,
        password: encryptedPassword,
      },
    });

    res.json({
      Created: newUser.createdAt,
      Name: newUser.username,
      Document: newUser.documentID,
      Email: newUser.email,
    });
  } catch (error) {
    res.json(error);
    next(error);
  }
};

// actualiza uno

export const updateUser = () => {
  const resx = resp();
  response.status = 200;
  response.body = {
    success: true,
    data: resx,
  };
};

// elimina uno

export const deleteUser = () => {
  const resx = resp();
  response.status = 200;
  response.body = {
    success: true,
    data: resx,
  };
};

/// login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRegistered = await prisma.users.findUnique({ where: { email } });

    if (userRegistered) {
      const checkedPassword = await comparePassword(
        password,
        userRegistered.password
      );

      if (checkedPassword) {
        const TokenSesion = await tokenSign(userRegistered);

        const userData = {
          Nombre: userRegistered.username,
          Documento: userRegistered.documentID,
          Email: userRegistered.email,
          Rol: userRegistered.role,
        };

        res.status(200).send({ data: userData, TokenSesion });
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } else {
      throw new Error("Usuario no registrado");
    }
  } catch (error) {
    res.status(401).json({ message: error.message, error: true });
  }
};
