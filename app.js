var tadaa = require('tadaa'),
    _ = require('underscore'),
    tadaaelb = require('tadaa-elb');
    
var interval = 120000;

var getValueOptions = {
  region: process.argv[2],
  elbName: process.argv[3]
}; 

var down = process.argv[4] || 'elb-down.ogg';
var player = process.argv[5] || 'ogg123';
  
tadaa.start(
    interval, 
    [{fn: tadaa.down, sound:down}], 
    tadaaelb,
    getValueOptions, 
    player);