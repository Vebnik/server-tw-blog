const createModel = require("../models/createModels");

class OtherService {

	async getAllUser() {
		const { userModel} = await createModel();
		return await userModel.findAll()
	}

	async getAllPosts() {
		const { postModel } = await createModel();
		return await postModel.findAll()
	}

	async createPost(body) {
		const { postModel } = await createModel();

		try {
			await postModel.sync({alter: true})
			await postModel.create({...body})
			return true;
		} catch (e) {
			return false
		}
	}

	async deletePosts(body) {

		try {
			const { postModel } = await createModel();
			await postModel.destroy({where: {id: body.id}})
			await postModel.sync({alter: true})
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	}

	async editPosts(body) {
		const { postModel } = await createModel();

		try {

			await postModel.sync({alter: true})
			const post = await postModel.findOne({where: {id: body.id}})
			await post.update(body.formData)

			return true;
		} catch (e) {
			return false
		}
	}

}

module.exports = new OtherService()