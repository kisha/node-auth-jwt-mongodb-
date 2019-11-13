const router = require('express').Router();
const User = require('../model/User');

router.post('/register', async (request, response) => {
  const user = new User({
    name: request.body.name, 
    email: request.body.email,
    password: request.body.password
  });
  try{
    const savedUser = await user.save();
    response.send(savedUser);
  }catch(error) {
    response.status(400).send(error);
  }
});

module.exports = router;