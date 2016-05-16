var mongodb = require('mongodb');
var uuid = require('uuid');

var MongoClient = mongodb.MongoClient;
var DBUrl = 'mongodb://localhost:27017/DotaDork';

var dbCon;


function createOrJoinMatch(playerId, cb) {
	console.log("In createOrJoinMatch");
	connect(DBUrl, function(res) {
		if(res.success === true) {
			dbCon=res.dbHandle;
			getNextUnfilledMatch(function(match){
				if(match === null) {
					createMatch(playerId, cb);
				}
				else {
					joinMatch(match, playerId, cb);
				}
			});
		}
		else {
			return cb(res);
		}
	});
}

function getNextUnfilledMatch(cb) {
	console.log("In getNextUnfilledMatch");
	var matchInventory = dbCon.collection('matchInventory');
	matchInventory.findOne({numberOfPlayers:1}, function(err, match) {
		console.log(JSON.stringify(match));
		return cb(match);
    });
}

function joinMatch(match, playerId, cb) {
	console.log("In joinMatch");
	var matchInventory = dbCon.collection('matchInventory');
	match.players.push(playerId);
	match.numberOfPlayers++;
	
	matchInventory.updateOne({matchId:match.matchId}, match, function(err, res) {
		if (err) {
			return cb({success: false, err: err});
		} else {
			return cb({success: true, match: match});
		}
    });
}

function createMatch(playerId, cb) {
	console.log("In createMatch");
	var matchInventory = dbCon.collection('matchInventory');
	var matchId = uuid.v1();
	
	var matchDocument = {matchId:matchId, players:[playerId], numberOfPlayers: 1};
	
	matchInventory.insert(matchDocument, function(err, records){
		if (err) {
			return cb({success: false, err: err});
		} else {
			return cb({success: true, match: matchDocument});
		}
	});
}

function connect(mongoUrl, cb) {
	MongoClient.connect(DBUrl, function (err, db) {
		if (err) {
			console.log('Connection failed to', DBUrl);
			return cb({success: false, err: err});
		} else {
			console.log('Connection established to', DBUrl);
			return cb({success: true, dbHandle: db});
		}
	});
}

createOrJoinMatch("HavaH123", function(res) {
	console.log(res);
	return;
});
