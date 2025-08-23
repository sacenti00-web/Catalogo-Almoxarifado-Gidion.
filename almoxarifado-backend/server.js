require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Conecte ao banco de dados usando a DATABASE_URL fornecida
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.error('Erro de conexão:', err));

// Defina o modelo do Mongoose
const PartSchema = new mongoose.Schema({
    name: String,
    code: String,
    photo: String,
    description: String,
    year: String,
    busModel: String,
    bodyModel: String,
    category: String,
    manufacturer: String,
    condition: String,
});

const Part = mongoose.model('Part', PartSchema);

// Rotas da API
app.get('/parts', async (req, res) => {
    try {
        const parts = await Part.find();
        res.json(parts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/parts', async (req, res) => {
    const newPart = new Part(req.body);
    try {
        const savedPart = await newPart.save();
        res.status(201).json(savedPart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Essa linha é essencial para a Vercel
module.exports = app;