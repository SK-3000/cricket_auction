// models/Player.js
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true }, // Bowler, Batsman, All-rounder, Wicketkeeper
  basePrice: { type: Number, required: true },
  image: { type: String }, // URL to player image
  soldTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
});

module.exports = mongoose.model('Player', PlayerSchema);