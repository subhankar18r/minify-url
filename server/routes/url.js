import express from "express";
import {
  handleGenerateUrl,
  handleGetAnalytics,
  handleGetUrl,
} from "../controllers/url.js";

const urlRouter = express.Router();

urlRouter
  .get("/:id", handleGetUrl)
  .post("/url", handleGenerateUrl)
  .get("/url/analytics/:id", handleGetAnalytics);

export default urlRouter;
