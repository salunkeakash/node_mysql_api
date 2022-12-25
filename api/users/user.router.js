const { userCreate, userUpdate, getusers, userById, userDelete, login } = require('./user.controller');
const router = require("express").Router();
const { checktoken } = require('../../auth/token.validation')

router.post('/', checktoken, userCreate);
router.get('/', checktoken, getusers);
router.get('/:id', checktoken, userById);
router.patch('/', checktoken, userUpdate);
router.delete('/', checktoken, userDelete)
router.post("/login", login);
module.exports = router;