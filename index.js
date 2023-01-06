import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
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

app.get("/movies", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movies = await client
    .db("b40wd")
    .collection("movies")
    .find(request.query)
    .toArray();
  // console.log(movies);
  response.send(movies);
});

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const movie = await client
    .db("b40wd")
    .collection("movies")
    .findOne({ id: id });
  // const movie = movies.find((mv) => mv.id == id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "movie not found" });
});

app.post("/movies", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client.db("b40wd").collection("movies").insertMany(data);
  response.send(result);
});
app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("b40wd")
    .collection("movies")
    .deleteOne({ id: id });
  // const movie = movies.find((mv) => mv.id == id);
  console.log(result);
  result
    ? response.send(result)
    : response.status(404).send({ message: "movie not found" });
});

app.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const result = await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });

  // const movie = movies.find((mv) => mv.id == id);
  console.log(result);
  result
    ? response.send({ message: "movies uptated successfully😁" })
    : response.status(404).send({ message: "movie not found" });
});
app.listen(PORT, () =>
  console.log(`The server started in: ${PORT} ✨✨😍😍😘😘❤️❤️✌️✌️`)
);
