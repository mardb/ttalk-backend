const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
// const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project03';

const app = express();

// index.js
//connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log("MongoDB connection error: ", err));

//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
//morgan first
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cors()); //allows all origins
// if(process.env.NODE_ENV = 'localhost:3000') //change later
if ((process.env.NODE_ENV = "development")) {
  //change later to localhost
  app.use(cors({ origin: `http://localhost:3000` }));
}
//middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
