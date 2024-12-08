import express from "express";
import urlRouter from "./routes/url.js";
import connectMongodb from "./mongoConnect.js";
import path from "path";
import Url from "./models/url.js";

const app = express();
const PORT = 8000;

connectMongodb("mongodb://localhost:27017/short-url");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.get("/", async (req, res) => {
  const allUrls = await Url.find({});
  res.render("home", {
    urls: allUrls,
  });
});

app.use("/api", urlRouter);

app.listen(PORT, () => {
  console.log("server running..");
});
