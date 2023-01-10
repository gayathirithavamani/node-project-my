import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  generateHashPassword,
  getUserByName,
} from "../services/user.service.js";
const router = express.Router();

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);
  console.log(userFromDB);
  if (userFromDB) {
    response.status(400).send({ message: "username already exits" });
  } else if (password.length < 8) {
    response.status(400).send({ message: "password must have 8 character" });
  } else {
    const hashPassword = await generateHashPassword(password);
    const result = await createUser({
      username: username,
      password: hashPassword,
    });
    response.send(result);
  }
});

router.post("/login", async function (request, response) {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);
  console.log(userFromDB);

  if (!userFromDB) {
    response.status(400).send({ message: "username and password incorrect" });
  } else {
    const storedDBPassword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);

    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY); //jwt token
      response.send({ message: "successfully login", token: token });
    } else {
      response.status(400).send({ message: "invalid credentials" });
    }
  }
});

export default router;
