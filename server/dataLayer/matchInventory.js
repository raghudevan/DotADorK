var mongodb = require('mongodb');
var uuid = require('uuid');

var MongoClient = mongodb.MongoClient;
var DBUrl = 'mongodb://localhost:27017/DotaDork';

var dbCon;

function updateMatchState(matchId, match, cb) {
	console.log("In updateMatch");
	connect(DBUrl, function(res) {
		if(res.success === true) {
			dbCon=res.dbHandle;
			getNextUnfilledMatch(function(match){
				if(match === null) {
					createMatch(playerId, function( res ) {
						dbCon.close();
						return cb(res);
					});
				}
				else {
					joinMatch(match, playerId, function( res ) {
						dbCon.close();
						return cb(res);
					});
				}
			});
		}
		else {
			return cb(res);
		}
	});
}

function updateMatch(matchId, match, cb) {
	matchInventory.updateOne({matchId:matchId}, match, function(err, res) {
		if (err) {
			return cb({success: false, err: err});
		} else {
			return cb({success: true, match: match});
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
	match.match.players.push(playerId);
	match.match.chat.push(playerId+" joined the match.");
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
	
	var matchDocument = createInitalMatchObject();
	
	matchDocument.matchId=matchId;
	matchDocument.match.players.push(playerId);
	matchDocument.match.chat.push(playerId+" joined the match.");
	
	matchInventory.insert(matchDocument, function(err, records){
		if (err) {
			return cb({success: false, err: err});
		} else {
			return cb({success: true, match: matchDocument});
		}
	});
}

function createInitalMatchObject() {
	return {
		match: {
			players: [],
			chat: []
		},
		numberOfPlayers: 1
	};
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


export function createOrJoinMatch(playerId, cb) {
	console.log("In createOrJoinMatch");
	connect(DBUrl, function(res) {
		if(res.success === true) {
			dbCon=res.dbHandle;
			getNextUnfilledMatch(function(match){
				if(match === null) {
					createMatch(playerId, function( res ) {
						dbCon.close();
						return cb(res);
					});
				}
				else {
					joinMatch(match, playerId, function( res ) {
						dbCon.close();
						return cb(res);
					});
				}
			});
		}
		else {
			return cb(res);
		}
	});
}

/*
createOrJoinMatch("12344", function( res ) {
	console.log(JSON.stringify(res));
});*/