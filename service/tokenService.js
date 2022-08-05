const jwt = require('jsonwebtoken')
const createModel = require("../models/createModels");

class TokenService {

	createToken(payload) {
		const accToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '10d'})

		return {
			accToken
		}
	}

	async saveTokenDb(userId, accToken) {
		const { tokenModel} = await createModel();
		await tokenModel.sync({alter: true})

		const isExistToken = await tokenModel.findOne({where: {id: userId}})

		if (isExistToken) {
			isExistToken.accToken = accToken
			return await isExistToken.save()
		}

		return await tokenModel.create({id: userId, accToken: accToken})
	}

	async validationToken (accToken) {
		const { tokenModel } = await createModel();

		const isExistToken = await tokenModel.findOne({where: {accToken: accToken}})

		return accToken === isExistToken?.dataValues?.accToken;
	}

	async validationTokenSession (accToken) {
		const { userModel, tokenModel} = await createModel();

		const token = await tokenModel.findOne({where: {accToken: accToken}})

		if (!token) return false

		const user = await userModel.findOne({where: {id: token?.dataValues?.id}})

		if (accToken === token?.dataValues?.accToken)
			return {...user?.dataValues, ...token?.dataValues}

		return false
	}

}

module.exports = new TokenService()
