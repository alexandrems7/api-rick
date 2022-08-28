const User = require("./User");

const findByEmailUserService = (email) => User.findOne({ email: email });

//cria usuário no body
const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();
const findByIdUserService = (idUser) => User.findById(idUser);

module.exports = {
  findByEmailUserService,
  createUserService,
  findAllUserService, 
  findByIdUserService,
  
};
