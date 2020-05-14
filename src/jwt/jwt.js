const fs = require('fs');
const jwt = require('jsonwebtoken');
const authJwt = require('express-jwt');

const getToken = async (obj, expiresIn) => {
// 获取签发 JWT 时需要用的密钥
	const privateKey = fs.readFileSync(`${__dirname}/key/private.key`);

	// 签发 Token
	const token = await jwt.sign(
		obj,
		privateKey,
		{ algorithm: 'RS256', expiresIn }
	);

	// 输出签发的 Token
	// console.log('RS256 算法：', token);
	return token;
};

const publicKey = fs.readFileSync(`${__dirname}/key/public.key`);

const jwtAuth = authJwt({ secret: publicKey }).unless({ path: ['/user/login', '/user/register'] });

module.exports = {
	getToken,
	jwtAuth
};
