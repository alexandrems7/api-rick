const Character = require("./Character"); //Acesso à Model

//Criação do Personagem
const createCharacterService = (name, imageUrl, userId) =>
  Character.create({ name, imageUrl, user: userId });

//Procura todos os personagens
const findAllCharactersService = () =>
  Character.find().sort({ _id: -1 }).populate("user");

//Procura personagens por ID
const findByIdCharacterService = (idCharacter) =>
  Character.findById(idCharacter);

const deleteCharacterService = async (idCharacter) => {
  return await Character.findByIdAndDelete(idCharacter);
};

//Search
//i ignora a case sensitive
const searchCharacterService = (message) =>
  Character.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const updateCharacterService = async (idCharacter, editedCharacter) => {
  const updatedCharacter = await Character.findByIdAndUpdate(
    idCharacter,
    editedCharacter
  );
  return updatedCharacter;
};

module.exports = {
  createCharacterService,
  findAllCharactersService,
  searchCharacterService,
  findByIdCharacterService,
  deleteCharacterService,
  updateCharacterService,
};
