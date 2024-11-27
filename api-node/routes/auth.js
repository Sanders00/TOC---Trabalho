const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const router = express.Router();
 
const EXPIRES = 86400;
 
function generateToken(params = {}, timeout = EXPIRES) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: EXPIRES,
  });
}
 
router.post('/', async (req, res) => {
  // Definir o tempo de expiração do Token (Default = 86400 seg = 24 horas)
  const { 'token-timeout': timeout = EXPIRES } = req.headers;
 
  const { username, password } = req.body;
 
  try {
    // Fazer uma requisição para o microserviço de autenticação na API principal
    const response = await axios.post(`http://localhost:8080/auth`, {
      username,
      password,
    });
 
    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Authentication failed' });
    }

    const user = response.data;
    const now = new Date();
    return res.json({
      token: generateToken({ id: user.id }, timeout),
      user,
      loggedIn: now,
      expiresIn: new Date(now.getTime() + timeout * 1000),
    });

  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});
 
 
module.exports = router;