const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  user: {
    //Relacionamento entre tabelas
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  
});

const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;
