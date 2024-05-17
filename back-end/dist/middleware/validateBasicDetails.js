"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicDetailsValidateRules = exports.validateBasicDetailsMiddlware = void 0;
const express_validator_1 = require("express-validator");
const basicDetailsValidateRules = () => {
    return [
        (0, express_validator_1.body)("full_name")
            .trim()
            .notEmpty()
            .withMessage({ field: "fullName", type: "null" }),
        (0, express_validator_1.body)("email")
            .trim()
            .notEmpty()
            .withMessage({ field: "email", type: "null" })
            .isEmail()
            .withMessage({ field: "email", type: "email" }),
        (0, express_validator_1.body)("address")
            .trim()
            .notEmpty()
            .withMessage({ field: "address", type: "null" }),
        (0, express_validator_1.body)("city").trim().notEmpty().withMessage({ field: "city", type: "null" }),
        (0, express_validator_1.body)("zipcode")
            .trim()
            .notEmpty()
            .withMessage({ field: "zipcode", type: "null" })
            .isLength({ min: 6, max: 6 })
            .withMessage({ field: "zipcode", type: "length" })
            .isInt()
            .withMessage({ field: "zipcode", type: "d-type" }),
    ];
};
exports.basicDetailsValidateRules = basicDetailsValidateRules;
const validateBasicDetailsMiddlware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const errorArr = errors.array().map((error) => error.msg);
    return res.status(422).json({
        errors: errorArr,
    });
};
exports.validateBasicDetailsMiddlware = validateBasicDetailsMiddlware;
