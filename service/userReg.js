const createModel = require("../models/createModels");
const tokenService = require('./tokenService')


class UserReg {

	async registerUser(email, password) {
		const { userModel, tokenModel} = await createModel();
		await userModel.sync({alter: true})

		const isExist = await userModel.findOne({ where: {email: email} })

		if (isExist) { return false }

		// register true
		const user = await userModel.create({
			email,
			password,
		})

		const token = tokenService.createToken({...user.dataValues})
		await tokenService.saveTokenDb(user.dataValues.id, token.accToken)

		return {
			...token,
			user: user
		}
	}

	async loginUser(email, password) {
		const { userModel, tokenModel} = await createModel();
		await userModel.sync({alter: true})

		const user = await userModel.findOne({where: {email: email}})

		if (password !== user?.dataValues?.password){ return false }

		const token = tokenService.createToken({...user.dataValues})
		await tokenService.saveTokenDb(user.dataValues.id, token.accToken)

		return {
			...token,
			user: user
		}
	}

}

module.exports = new UserReg()