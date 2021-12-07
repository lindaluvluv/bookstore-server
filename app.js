const express = require("express");
const path = require("path");

const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

module.exports = app;
// db.once("open", () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
