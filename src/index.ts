require("dotenv").config();
import express from "express";
require("express-async-errors");
import cors from "cors";
import router from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
