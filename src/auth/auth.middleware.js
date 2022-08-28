require("dotenv").config();
const jwt = require("jsonwebtoken");
const { find } = require("../users/User");
const { findByIdUserService } = require("../users/user.service");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Você não informou nenhum token." });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ message: "Poxa! Esse token é inválido!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer^/i.test(scheme)) {
    return res.status(401).send({ message: "Caraca, amigão! Token mal-formatado." });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    const user = await findByIdUserService(decoded.id);

    if(err || !user || !user.id){
        return res.status(401).send({ message: "Poxa! Esse token é inválido!" });
    }

    req.userId = user.id;

    return next();
    
  });

 
};
