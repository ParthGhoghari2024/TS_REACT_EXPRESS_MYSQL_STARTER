import express from "express";

const app = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
import path from "path";

import cors from "cors";

const REACT_APP_URL: string | undefined = process.env.REACT_APP_URL;
var corsOptions: corsOptionsInterface = {
  origin: [`${REACT_APP_URL}`],
};

app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

import formRouter from "./routes/basicDetailsFormRoutes";
import { corsOptionsInterface } from "./types/interfaces";

app.use("/", formRouter);

const port: string = process.env.PORT as string;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
