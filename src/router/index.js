const express = require('express');
const abc = require('./abc');

const router = express.Router();

router.get('/aaa', async (req, res) => {
	console.log(req.body);
	res.send('------');
});

router.get('/api', async (req, res) => {
	console.log(req.query);
	res.status(400).json({ a: 11 });
});

router.use('/api', abc);

module.exports = router;
