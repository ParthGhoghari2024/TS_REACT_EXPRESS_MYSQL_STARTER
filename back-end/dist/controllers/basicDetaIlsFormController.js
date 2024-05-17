"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBasicDetailsController = exports.basicDetailsFormPostController = exports.basicDetailsFormPageController = void 0;
const db_1 = __importDefault(require("../config/db"));
const basicDetailsFormPageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("basicDetailsFormPage");
    }
    catch (error) {
        console.log(error);
    }
});
exports.basicDetailsFormPageController = basicDetailsFormPageController;
const basicDetailsFormPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const basicDetailsFormBody = {
            fullName: req.body.fullName,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            zipcode: parseInt(req.body.zipcode),
        };
        const insertBasicDetailsSQL = `INSERT INTO  basicDetails(full_name,email,address,city,zipcode) values (?)`;
        const basicDetailsParams = Object.values(basicDetailsFormBody);
        const [result] = yield db_1.default.query(insertBasicDetailsSQL, [
            basicDetailsParams,
        ]);
        res.json({ success: 1, result: result });
    }
    catch (error) {
        console.log(error);
    }
});
exports.basicDetailsFormPostController = basicDetailsFormPostController;
const getAllBasicDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllBasicDetailsSQL = `SELECT id,full_name,email,address,city,zipcode from  basicDetails where deleted_at is null`;
        const [result] = yield db_1.default.query(getAllBasicDetailsSQL);
        res.json({ success: 1, result: result });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllBasicDetailsController = getAllBasicDetailsController;
