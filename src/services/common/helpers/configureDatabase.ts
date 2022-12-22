import mongoose from "mongoose";

mongoose.SchemaTypes.ObjectId.get((v) => v.toString());

export async function configureDatabase() {
  await mongoose.connect(process.env.MONGO_URI!, {});
  console.log("Connected to database");
}
