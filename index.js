const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var colors = require("colors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server is running on PORT: https://localhost:${PORT}`.underline.red
  )
);

mongoose.set("useFindAndModify", false);

// MONGOOSE CONNECTION
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MONGODB ATLAS".bold.white);
  }
);

// ROUTES
app.use("/auth", require("./Routes/userRoutes"));
app.use("/api", require("./Routes/postRoutes"));
