const Character = require("./Character"); //Acesso à Model

//Criação do Personagem
const createCharacterService = (name, photo, userId) =>
  Character.create({name, photo, user: userId });

//Procura todos os personagens
const findAllCharacterService = () =>
  Character.find().sort({ _id: -1 }).populate("user");

//Procura personagens por ID
  const findByIdCharacterService = () =>
  Character.findById().sort({ _id: -1 }).populate("user");


//Search
//i ignora a case sensitive
const searchCharacterService = (message) =>
  Character.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

module.exports = {
  createCharacterService,
  findAllCharacterService,
  searchCharacterService,
  findByIdCharacterService
};
