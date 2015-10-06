#!/usr/bin/env node

var Data = require('./modules/Data.js');
var Estimate = require('./modules/Estimate.js');
var Table = require('./modules/TableForMakeleaps.js');


var file_path = process.argv[2];
var milestone_title = process.argv[3];
var write_file_path = 'dist/' + milestone_title + '.csv';



var data = new Data({
	file_path: file_path
});

var estimate = new Estimate(
	data.milestones.getMilestoneByTitle(milestone_title)
);

var table = new Table(estimate);


table.writeFileSync(write_file_path);

console.log('create!: ' + write_file_path);
