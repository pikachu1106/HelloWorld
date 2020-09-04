const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const path = require("path");

const app = express();
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080; //STEP 1

const routes = require("./routes/api");

// mongodb run in out local computer or any server
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//STEP 2
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mern_youtube",
  options
);

// connected: Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity.
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected!!");
});

// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http request logger
// 應用層次的中介軟體連接至app object實例
// Sample app that will log all request in the Apache combined format to STDOUT(標準輸出)
// Using a predefined format string => 'tiny' => The minimal output.
// every single http request is going to log inside our terminal force to see what route that we are heating
app.use(morgan("tiny"));
app.use("/api", routes);

//STEP 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(PORT, console.log(`server is starting at ${PORT}`));
