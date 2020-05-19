// swagger
// const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');

// const initSwagger = (app) => {
// 	const swaggerDefinition = {
// 		info: {
// 			title: 'Node Swagger API',
// 			version: '1.0.0',
// 			description: 'Swagger 接口文档'
// 		},
// 		host: 'localhost:8000',
// 		basePath: '/'
// 	};

// 	// options for the swagger docs
// 	const options = {
// 		// import swaggerDefinitions
// 		swaggerDefinition,
// 		// path to the API docs
// 		apis: ['../routes/*.js']
// 	};

// 	// initialize swagger-jsdoc
// 	const swaggerSpec = swaggerJSDoc(options);

// 	// serve swagger
// 	app.get('/swagger.json', (req, res) => {
// 		res.setHeader('Content-Type', 'application/json');
// 		res.send(swaggerSpec);
// 	});

// 	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };

const expressSwaggerGenerator = require('express-swagger-generator-integral');

const initSwagger = (app) => {
	const expressSwagger = expressSwaggerGenerator(app);
	const options = {
		swaggerDefinition: {
			info: {
				description: 'This is a sample server',
				title: 'Swagger',
				version: '1.0.0'
			},
			host: 'localhost:8000'
			// basePath: '/v1'
			// produces: [
			// 	'application/json'
			// 	'application/xml'
			// ],
			// schemes: ['http', 'https'],
			// securityDefinitions: {
			// 	JWT: {
			// 		type: 'apiKey',
			// 		in: 'header',
			// 		name: 'Authorization',
			// 		description: ''
			// 	}
			// }
		},
		basedir: __dirname, // app absolute path
		files: ['../routes/**/*.js'] // Path to the API handle folder
	};
	expressSwagger(options);
};

module.exports = initSwagger;
