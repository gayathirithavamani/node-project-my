import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getMovies,
  getMovieById,
  createMovies,
  deleteMovieById,
  updateMovieById,
} from "../services/movies.service.js";
const router = express.Router();

router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movies = await getMovies(request);
  // console.log(movies);
  response.send(movies);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  const movie = await getMovieById(id);
  // const movie = movies.find((mv) => mv.id == id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "movie not found" });
});

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await createMovies(data);
  response.send(result);
});
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  const result = await deleteMovieById(id);
  // const movie = movies.find((mv) => mv.id == id);
  console.log(result);
  result
    ? response.send(result)
    : response.status(404).send({ message: "movie not found" });
});

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const result = await updateMovieById(id, data);

  // const movie = movies.find((mv) => mv.id == id);
  console.log(result);
  result
    ? response.send({ message: "movies uptate successfully😁" })
    : response.status(404).send({ message: "movie not found" });
});
export default router;
