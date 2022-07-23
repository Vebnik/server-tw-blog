const {Sequelize, Model, DataTypes} = require("sequelize");
const path = require("path");


const createModel = async () => {

	const sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: path.join(__dirname, '..', 'dataBase', 'dataFrame.sqlite')
	});

	const userModel = require('./userModel')
	const tokenModel = require('./tokenModel')
	const postModel = require('./postModel')

	return {
		userModel: await userModel(sequelize),
		tokenModel: await tokenModel(sequelize),
		postModel: await postModel(sequelize),
	};
}

module.exports = createModel