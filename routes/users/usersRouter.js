var express = require('express');
var router = express.Router();
const { createUser, userLogin } = require('./controller/userController')
const { checkIsEmpty } = require('../lib/validationMiddleware/checkIsEmpty');
const { validateCreateData } = require('../lib/validationMiddleware/validateCreateData');
const { validateEmail } = require('../lib/validationMiddleware/validateEmail');
const { jwtMiddleware } = require('../lib/validationMiddleware/jwtMiddleware');
const { validateUpdateData } = require('../lib/validationMiddleware/validateUpdateData');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', checkIsEmpty, validateCreateData, createUser)
router.post('/login', validateEmail, userLogin)
router.post('/update-profile', jwtMiddleware, checkIsEmpty, validateUpdateData)


module.exports = router