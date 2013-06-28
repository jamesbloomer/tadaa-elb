var AWS= require('aws-sdk'),
    _= require('underscore');

module.exports= function(options, done) {
    AWS.config.update({region: options.region});

    var elb = new AWS.ELB();

    elb.describeInstanceHealth({LoadBalancerName: options.elbName}, function (err, data) {
        
        if (err) {
            return done(err);
        }
        
        var inServiceInstances= _.filter(data.InstanceStates, function(i) {
            return i.State=== 'InService';
        });
    
        var numberOfInServiceInstances= inServiceInstances.length;
        return done(null, numberOfInServiceInstances);
    });
};