const userService = require("./users.service");
const authService = require("../auth/auth.service")
const findByEmailUserService = require("./users.service");

 
const createUserController = async (req, res) => {
  const { name, username, email, password, photo } = req.body;
 
  if (!username || !name || !email || !password || !photo) {
    return res.status(400).send({
      message:
        "Alguns campos estão faltando. Os campos são: 'username', 'name', 'email', 'password', 'photo'.",
    });
  }

  const foundUser = await userService.findByEmailUserService(email);

  //se o usuario existir, ele barra a crição
  if (foundUser) {
    return res.status(400).send({
      message: "Usuário já existe!",
    });
  }

  //caso o email exista, ele cria um novo
  const user = await userService
    .createUserService(req.body)
    .catch((err) => console.log(err.message));

  if (!user) {
    return res.status(400).send({
      message: "Erro ao criar Usuário!",
    });
  }


const token = authService.generateToken(user.id)

  res.status(201).send({
    user:{
      id: user.id,
      name,
      username,
      email,
      password,
      photo,
    },
    token,
  });

  
};

const findAllUserController = async (req, res) => {
  const users = await userService.findAllUserService();

  if (users.length === 0) {
    return res.status(400).send({
      message: "não existem users cadastrados",
    });
  }


  res.send(users);
};

module.exports = { createUserController, findAllUserController };
