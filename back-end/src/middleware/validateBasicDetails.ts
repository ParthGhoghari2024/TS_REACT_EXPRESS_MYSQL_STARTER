import { NextFunction, Request, RequestHandler, Response } from "express";
import { BasicDetailsFormInterface } from "../controllers/basicDetaIlsFormController";
import { body, validationResult, ValidationError } from "express-validator";
const basicDetailsValidate = () => {
  return [
    body("full_name")
      .trim()
      .notEmpty()
      .withMessage({ field: "fullName", type: "null" }),
    body("email")
      .trim()
      .notEmpty()
      .withMessage({ field: "email", type: "null" })
      .isEmail()
      .withMessage({ field: "email", type: "email" }),
    body("address")
      .trim()
      .notEmpty()
      .withMessage({ field: "address", type: "null" }),
    body("city").trim().notEmpty().withMessage({ field: "city", type: "null" }),
    body("zipcode")
      .trim()
      .notEmpty()
      .withMessage({ field: "zipcode", type: "null" })
      .isLength({ min: 6, max: 6 })
      .withMessage({ field: "zipcode", type: "length" })
      .isInt()
      .withMessage({ field: "zipcode", type: "d-type" }),
  ];
};

const validateBasicDetailsMiddlware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorArr = errors.array().map((error: ValidationError) => error.msg);

  return res.status(422).json({
    errors: errorArr,
  });
};

export { validateBasicDetailsMiddlware, basicDetailsValidate };
