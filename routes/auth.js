const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (request, response) => {  

//Validation 
  //TBD 

// Check if user email exists 
const emailExist = await User.findOne({email: request.body.email});
if(emailExist) return response.status(400).send('Email exists');

//Salt & Hash Password with Bcrypt
const salt = await bcrypt.genSalt(11);
const hashedPassword = await bcrypt.hash(request.body.password, salt);


  const user = new User({
    name: request.body.name, 
    email: request.body.email,
    password: hashedPassword
  });
  try{
    const newUser = await user.save();
    response.send(newUser);
  }catch(error) {
    response.status(400).send(error);
  }
});



router.post('/login', async (request, response) => {
//validations logic to be added

// Check if user email exists 
const user = await User.findOne({email: request.body.email});
if(!user) return response.status(400).send('Email incorrect');

//Valid Password
const validPassword = await bcrypt.compare(request.body.password, user.password);
if(!validPassword) return response.status(400).send('Password Incorrect')

//Create JWT token and assign it 

//send the _id to the front-end
const jwtToken = jwt.sign({_id: user._id }, process.env.JWT_TOKEN_SECRET)

//add to the header 
response.header('auth-token', jwtToken).send(jwtToken);



});

module.exports = router;