import express, { Router } from "express";
import {
  basicDetailsFormPageController,
  basicDetailsFormPostController,
  getAllBasicDetailsController,
} from "../controllers/basicDetaIlsFormController";
import {
  validateBasicDetailsMiddlware,
  basicDetailsValidate,
} from "../middleware/validateBasicDetails";

const router: Router = express.Router();

router
  .route("/")
  .get(basicDetailsFormPageController)

  .post(
    basicDetailsValidate(),
    validateBasicDetailsMiddlware,
    basicDetailsFormPostController
  );

router.route("/all").get(getAllBasicDetailsController);
export default router;
