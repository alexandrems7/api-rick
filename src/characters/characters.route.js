const router = require("express").Router();

const characterController = require("./characters.controller");

//Só cria o personagem, quem tiver logado. Por isso, usamos o auth middleware

const authMiddleware = require("../auth/auth.middleware");
//https://youtu.be/CTYGwIYZY9U?t=769
router.post("/create", authMiddleware, characterController.createCharacterController);

router.get("/", authMiddleware, characterController.findAllCharactersController);

router.get("/find/:id", authMiddleware, characterController.findByIdCharactersController);

router.get("/search", authMiddleware, characterController.searchCharacterController);



module.exports = router;
