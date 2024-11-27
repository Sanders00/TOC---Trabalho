const express = require('express');
const Event = require('../models/Event');
const axios = require('axios');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();

// Rota para criar um evento
router.post('/',isAuthenticated, async (req, res) => {
  const { deviceId, type, description, status } = req.body;

  try {
    // Se necessário, busque dados do dispositivo na API principal
    // const deviceResponse = await axios.get(`${process.env.MAIN_API_URL}/sensors/${deviceId}`);
    // if (!deviceResponse.data) return res.status(404).json({ message: 'Device not found' });

    const event = new Event({ deviceId, type, description, status });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving event' });
  }
});

// Rota para listar todos os eventos
router.get('/',isAuthenticated, async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Rota para atualizar um evento por ID
router.put('/:id',isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Rota para deletar um evento por ID
router.delete('/:id',isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;
