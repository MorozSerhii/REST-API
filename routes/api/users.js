const express = require("express");

const { ControllerWrapper } = require("../../utils");

const { validateBody, authorization } = require("../../middlewares/index");

const ctrl = require("../../controllers/auth");

const schemas = require("../../schemas/userSchemas");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ControllerWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ControllerWrapper(ctrl.login)
);

router.get("/current", authorization, ControllerWrapper(ctrl.getCurrent));

router.patch(
  "/",
  validateBody(schemas.updateSubscriptionJoiSchema),
  authorization,
  ControllerWrapper(ctrl.updateSubscription)
);

router.post("/logout", authorization, ControllerWrapper(ctrl.logout));
module.exports = router;
