"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const pino_1 = __importDefault(require("../utils/pino"));
const con = mysql2_1.default
    .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: true,
    timezone: "+00:00",
})
    .promise();
con
    .connect()
    .then(() => pino_1.default.info("db Connected"))
    .catch((error) => pino_1.default.info(error.message));
exports.default = con;
