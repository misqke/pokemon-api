require("dotenv").config();
const express = require("express");
const cors = require("cors");

const searchRouter = require("./routes/searchRouter");
const randomRouter = require("./routes/randomRouter");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.use("/api/search", searchRouter);
app.use("/api/random", randomRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server listening on port ${port}...`));
