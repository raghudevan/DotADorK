var http = require('http');
var fs = require('fs');
var request = require('request');

var STEAM_API_KEY = '06F9DABFA527EBD6875770DC7077CBD7';
var STEAM_HOST = 'api.steampowered.com';
var STEAM_PATH = '/IEconDOTA2_570/GetHeroes/v1?key='+STEAM_API_KEY;

var options = {
  host: STEAM_HOST,
  path: STEAM_PATH
};

function downloadHeroImages() {
	getHeroData(function( heroData ) {
		var imageResourceUri= "http://cdn.dota2.com/apps/dota2/images/heroes/";
		var imageResourceSuffix= "_full.png";
		
		heroData.forEach(function( hero ) {
			var heroName= hero.name.replace("npc_dota_hero_","");
			var heroImageUri= imageResourceUri+heroName+imageResourceSuffix;
			downloadImage(heroImageUri, "../images/heroes/"+heroName+".png", function( res ) {
				console.log(heroName+" completed");
			});
		});
	});
}

function getHeroData(cb) { 
	http.get(options, function(resp){
		resp.on('data', function(chunk){
			var heroList= JSON.parse(chunk);
			var heroData= heroList.result.heroes;
			cb(heroData);
		});
	}).on("error", function(e){
		console.log("Got error: " + e.message);
		cb([]);
	});
}

function downloadImage(uri, filename, callback){
	request.head(uri, function(err, res, body){
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

downloadHeroImages();