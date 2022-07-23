const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')
const app = express();
const createModel = require('./models/createModels')
const router = require('./router/routerIndex')

// express ext
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookie());
app.use('/api', router)

// Start Logic
const startServer = async () => {
	try {
		app.listen(process.env.PORT, () => console.log(`Server listen ${process.env.PORT} PORT`))
	} catch (err) {
		console.error(err)
	}
}; startServer().catch(err => console.log(err))