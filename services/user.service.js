import { client } from "../index.js";
import bcrypt from "bcrypt";

export async function generateHashPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashPassword);
  return hashPassword;
}

// generateHashPassword("password@123");

//db.user.insertOne(data)
export async function createUser(data) {
  return await client.db("b40wd").collection("user").insertOne(data);
}

export async function getUserByName(username) {
  return await client
    .db("b40wd")
    .collection("user")
    .findOne({ username: username });
}
