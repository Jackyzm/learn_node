const express = require('express');
// const user = require('./user');

const router = express.Router();

router.get('/aaa', async (req, res) => {
	// console.log(req.body, req.user);
	res.send('------');
});

router.get('/api', async (req, res) => {
	console.log(req.query);
	res.status(400).json({ a: 11 });
});

module.exports = router;
