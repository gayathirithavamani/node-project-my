import jwt from "jsonwebtoken";

//custom middle ware

export const auth = (request, response, next) => {
  try {
    const token = request.header("x-auth-token"); //data from header
    console.log("token", token);
    jwt.verify(token, process.env.SECRET_KEY); //verification
    next(); //next go
  } catch (err) {
    response.status(401).send({ message: err.message });
  }
};
