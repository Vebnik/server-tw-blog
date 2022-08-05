const tokenService = require('./tokenService')


const validSession = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization

		if (!authHeader)
			return res.json({message: 'not authorization', ok: false})

		const accToken = authHeader.replace(/Bearer /, '')

		tokenService.validationToken(accToken)
			.then(results => results
				? next()
				: res.json({message: 'not valid token', ok: false}))

	} catch (err) {
		console.log(err)
		//return new Error(err)
	}
}

const validSessionContext = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization


		if (!authHeader)
			return res.json({message: 'not authorization', ok: false})

		const accToken = authHeader.replace(/Bearer /, '')

		tokenService.validationTokenSession(accToken)
			.then(results => results
				? res.json({message: 'sessions access', ok: true, data: results})
				: res.json({message: 'not valid token', ok: false}))

	} catch (err) {
		console.log(err)
	}
}

module.exports = { validSession, validSessionContext }