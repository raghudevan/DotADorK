import express from 'express';
import bodyParser from 'body-parser';

let router = express.Router();
router.use(bodyParser.json());

router.get('/testGET', (req, res, next) => {
	res.json({ response: req.query.param });
});

export { router };