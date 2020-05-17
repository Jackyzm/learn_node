const uuid = require('uuid').v4;
const { getToken } = require('../jwt/jwt');
const { MongoDB } = require('./index');

// 登陆
const login = async ({ mobile = '', password = '' }) => {
	// console.log({ mobile, password });
	const collection = await MongoDB.DB.collection('user');
	const result = await collection.findOne({ mobile });

	if (!result) throw new Error('用户不存在');
	if (result.password !== password) throw new Error('密码错误');

	const token = await getToken(result, 60 * 60 * 24);
	const refreshToken = await getToken(result, 60 * 60 * 24 * 3);

	return {
		access_token: token,
		expires_in: 60 * 60 * 24,
		token_type: 'bearer',
		refresh_token: refreshToken
	};
};

// 注册
const register = async ({ mobile = '', password = '' }) => {
	const collection = await MongoDB.DB.collection('user');
	const result = await collection.findOne({ mobile });
	if (result) throw new Error('用户已存在');

	await collection.insertOne({
		mobile,
		password,
		id: uuid().split('-').join('')
	});
	return null;
};

// 删除用户
const deleteUser = async ({ id = '' }) => {
	const collection = await MongoDB.DB.collection('user');
	const result = await collection.findOne({ id });

	if (!result) throw new Error('用户不存在');
	await collection.deleteOne({ id });
	return null;
};

module.exports = {
	login,
	register,
	deleteUser
};
