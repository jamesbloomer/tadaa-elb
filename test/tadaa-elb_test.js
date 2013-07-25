var assert = require('assert'),
    sinon = require('sinon'),
    AWS= require('aws-sdk'),
    tadaaelb = require('../tadaa-elb');

describe('tadaa-elb', function() {
    var describeInstanceHealth;
    
    beforeEach(function() {
        describeInstanceHealth = sinon.stub();
        sinon.stub(AWS, 'ELB').returns({describeInstanceHealth: describeInstanceHealth});
    });
    
    afterEach(function() {
        AWS.ELB.restore();
    });
    
    it('should return 1 when one instance in service', function(done) {
        describeInstanceHealth.yields(null, {InstanceStates:[{State:"InService"}]});
        tadaaelb.getValue({region: "REGION", elbName: "ELB"}, function(e, n) {
            assert.equal(e, null);
            assert.equal(n, 1);
            return done();
        });
    });
    
    it('should return 2 when two instances in service', function(done) {
        describeInstanceHealth.yields(null, {InstanceStates:[{State:"InService"},{State:"InService"}]});
        tadaaelb.getValue({region: "REGION", elbName: "ELB"}, function(e, n) {
            assert.equal(e, null);
            assert.equal(n, 2);
            return done();
        });
    });
    
    it('should return 1 when one instance in service, one OutOfService', function(done) {
        describeInstanceHealth.yields(null, {InstanceStates:[{State:"InService"},{State:"OutOfService"}]});
        tadaaelb.getValue({region: "REGION", elbName: "ELB"}, function(e, n) {
            assert.equal(e, null);
            assert.equal(n, 1);
            return done();
        });
    });
});