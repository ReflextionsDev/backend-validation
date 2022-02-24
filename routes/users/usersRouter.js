var express = require('express');
var router = express.Router();
const { createUser, userLogin, updateProfile } = require('./controller/userController')
const { checkIsEmpty,
  jwtMiddleware,
  validateCreateData,
  validateEmail,
  validateUpdateData } = require('../lib/validationMiddleware/index')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', checkIsEmpty, validateCreateData, createUser)
router.post('/login', validateEmail, userLogin)
router.post('/update-profile', jwtMiddleware, checkIsEmpty, validateUpdateData, updateProfile)

module.exports = router