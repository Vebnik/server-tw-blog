const Router = require('express').Router
const userCtrl = require('../controllers/userControllers')
const router = new Router()
const { body } = require('express-validator')
const { validSession, validSessionContext } = require('../service/authService')

// userAuth
router.post('/register',
	body('email').isEmail(),
	body('password').isLength({min: 8, max: 24}),
	userCtrl.register)

router.post('/login',
	userCtrl.login)

router.get('/user',
	validSession,
	userCtrl.getUser)

router.get('/checkAuth',
	validSessionContext)

// other
router.get('/posts',
	validSession,
	userCtrl.getPost)

router.post('/posts',
	validSession,
	userCtrl.createPost)

router.delete('/posts',
	validSession,
	userCtrl.deletePost)

router.patch('/posts',
	validSession,
	userCtrl.editPost)
module.exports = router
