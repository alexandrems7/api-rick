const characterService = require("./characters.service");

//Criação de personagem
const createCharacterController = async (req, res) => {
  //Tente fazer. Se não cosneguir, traga o catch.
  try {

    const { name, photo} = req.body;
    if (!name || !photo) {
      res.status(400).send({
        message:
          "envie todos os dados necessário para a criação do personagem ",
      });
    }
    const { id } = await characterService.createCharacterService(name, photo, req.userId);

    return res.send({
      message: "Personagem criado com sucesso",
      character: { id, name, photo },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
   
  }
};

//Busca todos os personagens de uma vez
const findAllCharactersController = async (req, res) => {
  try {
    const character = await characterService.findAllCharactersService();

    if (character.length === 0) {
      return res.status(400).send({ message: "Não existem tweets!" });
    }

    return res.send({
      results: character.map((character) => ({
        id: character._id,
        name: character.name,
        photo: character.photo,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//Busca por Id
const findByIdCharactersController = async (req, res) => {
  try {
    const character = await characterService.findByIdCharactersService();

    if (character.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existe personagem com esse Id" });
    }

    return res.send({
      results: character.map((character) => ({
        id: character._id,
        name: character.name,
        photo: character.photo,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//Search
const searchCharacterController = async (req, res) => {
  try {
    const { message } = req.query;

    const character = await characterService.searchCharacterService(message);

    if (character.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existem personagens com esse nome!" });
    }

    return res.send({
      results: character.map((character) => ({
        id: character._id,
        name: character.name,
        photo: character.photo,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createCharacterController,
  findAllCharactersController,
  findByIdCharactersController,
  searchCharacterController,
};
