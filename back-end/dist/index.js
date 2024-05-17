"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const REACT_APP_URL = process.env.REACT_APP_URL;
var corsOptions = {
    origin: [`${REACT_APP_URL}`],
};
app.use((0, cors_1.default)(corsOptions));
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const basicDetailsFormRoutes_1 = __importDefault(require("./routes/basicDetailsFormRoutes"));
app.use("/", basicDetailsFormRoutes_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
