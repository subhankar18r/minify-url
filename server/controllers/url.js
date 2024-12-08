import { nanoid } from "nanoid";
import Url from "../models/url.js";

async function handleGenerateUrl(req, res) {
  let url = req.body.url;
  if (url) {
    if (!url.startsWith("https://")) {
      url = "https://" + url;
    }
  } else {
    return res.status(400).json({ error: "url required" });
  }

  const shortId = nanoid(8);
  try {
    await Url.create({
      shortId: shortId,
      redirectUrl: url,
      visitedHistory: [],
    });

    return res.render("home", {
      newUrl: `http://localhost:8000/api/${shortId}`,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

async function handleGetUrl(req, res) {
  const shortId = req.params.id;
  try {
    const result = await Url.findOneAndUpdate(
      { shortId: shortId },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(result.redirectUrl);
  } catch (error) {
    return res.status(500).send("can't find " + error);
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.id;

  try {
    const result = await Url.findOne({ shortId: shortId });
    if (!result) {
      res.status(400).send("something wrong");
    } else {
      res.send("this site visited " + result.visitedHistory.length + " times");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export { handleGenerateUrl, handleGetUrl, handleGetAnalytics };
