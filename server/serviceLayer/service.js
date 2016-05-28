import express from 'express';
import bodyParser from 'body-parser';
import { getState } from '../../src/store/makeStoreForServer';

let router = express.Router();
router.use(bodyParser.json());

router.get('/getConnectedUsers', (req, res, next) => {
	res.json({ connectedUsers: getState().chatState.connectedUsers });
});

router.get('/getServerState', (req, res, next) => {
	res.json({ response: getState() });
});

export { router };