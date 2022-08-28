const { isValidObjectId } = require("mongoose");
const characterService = require("./characters.service");

//Criação de personagem
const createCharacterController = async (req, res) => {
  //Tente fazer. Se não cosneguir, traga o catch.
  try {
    const { name, imageUrl } = req.body;
    if (!name || !imageUrl) {
      res.status(400).send({
        message:
          "envie todos os dados necessário para a criação do personagem ",
      });
    }
    const { id } = await characterService.createCharacterService(
      name,
      imageUrl,
      req.userId
    );

    return res.send({
      message: "Personagem criado com sucesso",
      character: { id, name, imageUrl },
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
        imageUrl: character.imageUrl,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//Busca por Id
const findByIdCharactersController = async (req, res) => {
  try {
    const character = await characterService.findByIdCharacterService();

    if (character.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existe personagem com esse Id" });
    }

    return res.send({
      results: character.map((character) => ({
        id: character._id,
        name: character.name,
        imageUrl: character.imageUrl,
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
        imageUrl: character.imageUrl,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//Deleta personagem
const deleteCharacterController = async (req, res) => {
  const idCharacter = req.params.id;
  console.log(idCharacter);

  if (isValidObjectId(!idCharacter)) {
    return res
      .status(400)
      .send({ message: "Não existe personagem com esse Id" });
  }

  await characterService.deleteCharacterService(idCharacter);

  res.send({
    message: `"O personagem foi deletado com sucesso!"`,
  });
};

const updateCharacterController = async (req, res) => {
  const idCharacter = req.params.id;

  const editedCharacter = req.body;

  const updatedCharacter = await characterService.updateCharacterService(
    idCharacter,
    editedCharacter
  );
  res.send(updatedCharacter);
};
module.exports = {
  createCharacterController,
  findAllCharactersController,
  findByIdCharactersController,
  searchCharacterController,
  deleteCharacterController,
  updateCharacterController,
};
