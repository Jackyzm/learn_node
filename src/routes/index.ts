import { Router } from '@types/express';
import express from 'express';
// const user = require('./user');

const router: Router = express.Router();

/**
 * @route POST /users
 * @summary d达萨达萨达萨达萨
 * @param {Point.model} point.body.required - the new point
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email
 * @param {string} password.query.required - user's password.
 * @param {enum} status.query.required - Status values that need to be considered for filter - eg: available,pending
 * @operationId retrieveFooInfo
 * @returns {Response.model} 200 - An array of user info
 * @returns {Product.model}  default - Unexpected error
 * @returns {Array.<Point>} Point - Some description for point
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
