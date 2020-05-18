const express = require('express');
const {
	login,
	register,
	deleteUser
} = require('../model/user');
const { getToken } = require('../jwt');

const router = express.Router();

/**
 * @api {post} /user/login 登陆
 * @apiGroup User
 *
 * @apiParam {String} mobile 电话号码
 * @apiParam {String} password 密码
 *
 */
router.post('/user/login', async (req, res) => {
	// console.log(req.body);
	try {
		const result = await login(req.body);
		res.successResponse(result);
	} catch (err) {
		res.errorResponse(err);
	}
});

/**
 * @api {post} /refresh/token 刷新token
 * @apiGroup User
 *
 */
router.post('/refresh/token', async (req, res) => {
	// console.log(req.body);
	const token = await getToken(req.user, 60 * 60 * 24);
	const refreshToken = await getToken(req.user, 60 * 60 * 24 * 3);

	const result = {
		access_token: token,
		expires_in: 60 * 60 * 24,
		token_type: 'bearer',
		refresh_token: refreshToken
	};

	res.successResponse(result);
});

/**
 * @api {post} /user/register 注册
 * @apiGroup User
 *
 * @apiParam {String} mobile 电话号码
 * @apiParam {String} password 密码
 *
 */
router.post('/user/register', async (req, res) => {
	// console.log(req.body);
	try {
		await register(req.body);
		res.successResponse();
	} catch (err) {
		res.errorResponse(err);
	}
});

/**
 * @api {put} /user 更新用户信息
 * @apiGroup User
 *
 * @apiParam {String} mobile 电话号码
 * @apiParam {String} password 密码
 *
 */
router.put('/user', async (req, res) => {
	console.log(req.query);
	// res.sendStatus(400);
	res.status(400).json({ a: 11 });
});

/**
 * @api {delete} /user/:id 删除用户
 * @apiGroup User
 *
 * @apiParam {String} mobile 电话号码
 *
 */
router.delete('/user/:id', async (req, res) => {
	try {
		await deleteUser(req.params);
		res.successResponse();
	} catch (err) {
		res.errorResponse(err);
	}
});

module.exports = router;
