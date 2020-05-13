const express = require('express');

const router = express.Router();

router.get('/abc', async (req, res) => {
	console.log(req.body);
	// res.sendStatus(400);
	res.send('------');
});

router.get('/api', async (req, res) => {
	console.log(req.query);
	// res.sendStatus(400);
	res.status(400).json({ a: 11 });
});

module.exports = router;
