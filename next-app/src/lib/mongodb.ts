import mongoose from "mongoose";

// In development, cache the connection across hot reloads to avoid
// creating many connections during next dev reloads.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  console.log("[mongodb] MONGODB_URI:", uri);
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not defined. Add it to .env.local: MONGODB_URI=mongodb://localhost:27017/interview_app"
    );
  }

  if (global._mongooseConn) {
    const conn = await global._mongooseConn;
    console.log("[mongodb] active database:", mongoose.connection.name);
    return conn;
  }

  global._mongooseConn = mongoose.connect(uri);
  const conn = await global._mongooseConn;
  console.log("[mongodb] active database:", mongoose.connection.name);
  return conn;
}
