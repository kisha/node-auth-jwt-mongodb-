const router = require('express').Router();
const loginRequired = require('./verifyToken');


router.get('/', loginRequired,(request, response) => {
  response.json({
    posts: {
      title: 'hello brooklyn',
      name: 'private route'
    }
  });
})

module.exports = router;