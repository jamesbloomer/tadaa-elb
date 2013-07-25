var AWS= require('aws-sdk'),
    _= require('underscore'),
    tadaa = require('tadaa');

var elb = {};

elb.getValue = function(options, done) {
    AWS.config.update({region: options.region});

    var elb = new AWS.ELB();

    elb.describeInstanceHealth({LoadBalancerName: options.elbName}, function (err, data) {
        
        if (err) {
            return done(err);
        }
        
        var inServiceInstances = _.filter(data.InstanceStates, function(i) {
            return i.State === 'InService';
        });
    
        var numberOfInServiceInstances = inServiceInstances.length;
        return done(null, numberOfInServiceInstances);
    });
};

elb.logic = [{fn: tadaa.down, sound: "elb-healthy-instance-decrease.ogg"}];

module.exports = elb;