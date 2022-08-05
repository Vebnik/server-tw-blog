const method = require('../service/userReg')
const otherMethod = require('../service/otherService')
const { validationResult } = require('express-validator')

class UserControllers {

	async register(req, res, next) {
		try {
			const isValidData = validationResult(req)

			if (!isValidData.isEmpty())
				return res.json({message: 'invalid user data: pass / email', ok: false})

			const {email, password } = req.body
			const getDate = (day) => day * 24 * 60 * 60 * 1000

			method.registerUser(email, password)
				.then(results => {
					if (results) {
						res.cookie('accToken', results.accToken, {maxAge: getDate(10), httpOnly: true})
						res.json({message: 'user created', ok: true, data: results})

						return;
					}
						res.json({message: 'user already exist', ok: false})
				})

		} catch (err) {
			console.log(err)
		}
	}

	async login(req, res, next) {
		try {
			const {email, password } = req.body
			const getDate = (day) => day * 24 * 60 * 60 * 1000

			method.loginUser(email, password)
				.then(results => {
					if(results) {
						res.cookie('accToken', results.accToken, {maxAge: getDate(10), httpOnly: true})
						return res.json({message: 'user login', ok: true, data: results})
					}

					res.json({message: 'invalid login data or not created user', ok: false})
				})

		} catch (err) {
			console.log(err)
		}
	}

	async getUser(req, res, next) {
		try {
			otherMethod.getAllUser()
				.then(results => res.json({ok: true, data: results.map(el => el.dataValues)}))
		} catch (err) {
			console.log(err)
		}
	}

	async getPost(req, res, next) {
		try {

			if (/\?/gmi.test(req.url)){

				const [param, value] = decodeURI(req.url).replace(/\/posts\?/gmi, '').split('=')

				otherMethod.searchPosts(param, value)
					.then(results => res.json({ok: true, data: results.map(el => el.dataValues)}))
				return
			}

			otherMethod.getAllPosts()
				.then(results => res.json({ok: true, data: results.map(el => el.dataValues)}))
		} catch (err) {
			console.log(err)
		}
	}

	async createPost(req, res, next) {
		try {
			otherMethod.createPost(req.body)
				.then(results => results
					? res.json({message: 'post created', ok: true})
					: res.json({message: 'post not created', ok: false})
				)
		} catch (err) {
			console.log(err)
		}
	}

	async deletePost(req, res, next) {
		try {
			otherMethod.deletePosts(req.body)
				.then(results => results
					? res.json({message: 'post deleted', ok: true})
					: res.json({message: 'post not deleted', ok: false})
				)
		} catch (err) {
			console.log(err)
		}
	}

	async editPost(req, res, next) {
		try {
			otherMethod.editPosts(req.body)
				.then(results => results
					? res.json({message: 'post edited', ok: true})
					: res.json({message: 'post not edited', ok: false})
				)
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = new UserControllers()