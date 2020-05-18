const express = require('express');
// const user = require('./user');

const router = express.Router();

/**
 * @api {get} /aaa abc
 * @apiName aaa
 * @apiGroup api
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/aaa', async (req, res) => {
	// console.log(req.body, req.user);
	res.send('------');
});

router.get('/api', async (req, res) => {
	console.log(req.query);
	res.status(400).json({ a: 11 });
});

module.exports = router;
