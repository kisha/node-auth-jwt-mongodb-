const jwt = require('jsonwebtoken');

module.exports = function(request, response, next) {
  const authToken = request.header('auth-token');
  if(!authToken) return response.status(401).send('Access Denied');

  try{
    const verifiedToken = jwt.verify(authToken, process.env.JWT_TOKEN_SECRET);
    //this will return the _id
    request.user = verifiedToken;
    next();

  }catch(error) {
    response.status(400).send('Token is Invalid')
  }
};

