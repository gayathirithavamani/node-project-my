import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.routes.js";
dotenv.config();
console.log(process.env.MONGO_URL);
const app = express();

const PORT = process.env.PORT;
//connection node to mongo
//const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); //dail
await client.connect(); //call
console.log("mongo is connected!!!!✌️✌️✌️✌️");

app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/movies", moviesRouter);

app.listen(PORT, () =>
  console.log(`The server started in: ${PORT} ✨✨😍😍😘😘❤️❤️✌️✌️`)
);

export { client };
