/**
 * Created by Zachariah on 3/22/2016.
 *
 *  Routes for Post, Get, and Put
 */

var express = require('express'),
	router = express.Router(),
	path = require('path'),
    Q = require('q'),
    exec = require('child-process-promise').exec;

var Location = require('./schema.js');


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


router.get('/GET/Location', function(req, res){
    
    console.log("/Get/Location");
    
    //Create promise to find all Locations
	var promise = Location.find({}).exec();

	//Resolve step: Returns panel ids found by query
	promise.then(function(locations) {

			var locationsArray = [];

			locations.forEach(function(location) {
				locationsArray.push(location);
			});
            
            console.log(locationsArray);
			res.json(locationsArray);
		}) //Catch step: catch any arror thrown by promise.
		.catch(function(err) {
			res.json({
				error: err.message
			});
		});
});

//Allows user to find friends by id instead of grabbing all locations in database. Will be implemented in the future.
router.get('/GET/Location/:id', function(req, res) {
});

router.put('/PUT/Location', function(req, res) {
    
    console.log('/PUT/Location');
    console.log(req.body);
    console.log(req.body.ID);
    


    
  /*  var newData = {
        Lat: req.body.Lat,
        Lon: req.body.Lon
    };
    
    Location.where('ID', req.body.ID).update({$set: {Lat: req.body.Lat, Lon: req.body.Lon}}).then(function(result){
			res.json({
				location: result
			}); 
		}).catch(function(error) {
			res.json({
				error: error.message
			});
		})*/
    
    /*var query = {'ID':req.body.ID};
    
    Location.findOneAndUpdate(query, {Lat: req.body.Lat, Lon: req.body.Lon}, {upsert:true}, function(err, doc){
        if(err){return res.json({error: err});}
        return res.json({location: doc});
    });*/
});

router.post('/POST/Update', function(req, res) {
    
    console.log('/POST/Update');
    console.log(req.body);
    console.log(req.body.ID);
    
    var query = {'ID':req.body.ID};
    
    Location.findOneAndUpdate(query, {Lat: req.body.Lat, Lon: req.body.Lon}, {upsert:true}, function(err, doc){
        if(err){return res.json({error: err});}
        return res.json({location: doc});
    });
});

router.post('/POST/Location', function(req, res) {

	//var User = req.body.ID;
    //console.log(req.body);
    console.log("/POST/Location");
    console.log(req.body);
    console.log(req.body.ID);
    
    var data = new Location (req.body);
    
    //console.log(data);
    
   	Location.saveLocation(data).then(function(result){
			res.json({
				location: result
			});
		}).catch(function(error) {
			res.json({
				error: error.message
			});
		});
});

module.exports = router;