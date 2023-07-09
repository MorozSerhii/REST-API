const express = require("express");

const { ControllerWrapper } = require("../../utils");

const { validateBody, authorization, upload } = require("../../middlewares");

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
router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  ControllerWrapper(ctrl.updateAvatar)
);

router.post("/logout", authorization, ControllerWrapper(ctrl.logout));

router.get("/verify/:verificationToken", ControllerWrapper(ctrl.verification));

router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ControllerWrapper(ctrl.resendEmail)
);
module.exports = router;
