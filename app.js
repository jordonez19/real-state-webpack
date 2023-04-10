const express = require("express");
const app = express();
const connection = require("./database/connection.js");
const routes = require("./routes/index.js");
const port = process.env.PORT;
const cors = require("cors");

/* connection.then(() => {
  const server = app.listen(port, () => {
    console.log("Connected and listening on port ", port);
  });
});
 */
//to view the state
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //parse  from data
app.use(cors());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Connected and listening on port ${port}`);
});
