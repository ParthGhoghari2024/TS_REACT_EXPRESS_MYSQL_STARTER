"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basicDetaIlsFormController_1 = require("../controllers/basicDetaIlsFormController");
const validateBasicDetails_1 = require("../middleware/validateBasicDetails");
const router = express_1.default.Router();
router
    .route("/")
    .get(basicDetaIlsFormController_1.basicDetailsFormPageController)
    .post((0, validateBasicDetails_1.basicDetailsValidate)(), validateBasicDetails_1.validateBasicDetailsMiddlware, basicDetaIlsFormController_1.basicDetailsFormPostController);
router.route("/all").get(basicDetaIlsFormController_1.getAllBasicDetailsController);
exports.default = router;
