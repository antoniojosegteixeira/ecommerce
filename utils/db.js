import mongoose from "mongoose";

const connection = {};

const connect = async () => {
  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection");
      return;
    }
    await mongoose.disconnect();
  }

  try {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("New connection");
        connection.isConnected = db.connections[0].readyState;
      });
  } catch (err) {
    console.log(err.message);
  }
};

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

async function convertDocToJson(doc) {
  return JSON.parse(JSON.stringify(doc));
}

const db = { connect, disconnect, convertDocToJson };

export default db;
