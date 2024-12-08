import mongoose from "mongoose";

async function connectMongodb(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected to database");
    })
    .catch(() => {
      console.log("problem connecting to database");
    });
}

export default connectMongodb;
