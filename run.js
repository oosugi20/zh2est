#!/usr/bin/env node

var app = require('./formalizeIssuesJson.js');


var file_path = process.argv[2];
var milestone_title = process.argv[3];
var write_file_path = 'dist/' + milestone_title + '.csv';

//console.log(
//app.utils.readJsonSync(file_path)
//);


var my = {};


my.model = new app.Model({
	file_path: file_path
});

my.estimate = new app.Estimate(my.model.milestones.getMilestoneByTitle(milestone_title));
my.table = new app.Table(my.estimate); 

my.table.writeFileSync(write_file_path);
console.log('create!: ' + write_file_path);

//console.dir(my.estimate.milestone.issues);
