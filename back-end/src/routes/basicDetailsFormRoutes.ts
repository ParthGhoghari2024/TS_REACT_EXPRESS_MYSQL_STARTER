import express, { Router } from "express";
import {
  basicDetailsFormPageController,
  basicDetailsFormPostController,
  getAllBasicDetailsController,
} from "../controllers/basicDetaIlsFormController";
import {
  basicDetailsValidateRules,
  validateBasicDetailsMiddlware,
} from "../middleware/validateBasicDetails";

const router: Router = express.Router();

router
  .route("/")
  .get(basicDetailsFormPageController)

  .post(
    basicDetailsValidateRules(),
    validateBasicDetailsMiddlware,
    basicDetailsFormPostController
  );

router.route("/all").get(getAllBasicDetailsController);
export default router;
