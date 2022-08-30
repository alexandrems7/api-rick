const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

//router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;