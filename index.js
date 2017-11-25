/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// assorted test-related globals required by "runNodeTests"
define(["assert"], function(assert) {
    "use strict";
      
    function test(label, func, func2) {
        if ("function" === typeof (label)) {
            func = label;
            label = "unnamed";
        }
        if ("function" !== typeof (func) && "function" === typeof (func2)) {
            func = func2;
        }

        print("test: " + label);
        assert.end = function() {};
        assert.plan = function() {};
        assert.done = function() {};
        assert.same = assert.deepEqual;
        assert.notOk = function(expr, msg) {
            return assert.ok(!expr, msg);
        };
        assert.test = test;
        assert.pass = function() {};
        assert.equals = assert.equal;
        func(assert);
    }

    test.asyncTest = test;
    test.describe = test;
    test.it = function(label, func) {
        print("test: " + label);
        func(function(){ });
    };
    test.after = test;

    test.suite = function(label) {
        print("test: " + label);
    };

    test.QUnit = {
        module: function(label) {
            print("test: " + label);
        },
        config: {},
        assert: assert
    };

    test.expect = function(actual) {
        var res = {
            to: {
                equal: function(expected) {
                    assert.equal(actual, expected);
                },
                eql: function(expected) {
                    assert.deepEqual(actual, expected);
                },
                have: {
                    length: function(expectedlen) {
                        assert.equal(actual.length, expectedlen);
                    }
                },
                not: {
                    be: {
                        ok: function() {
                            assert.ok(!actual);
                        },
                        empty: function() {
                            assert.ok(actual.length > 0);
                        }
                    }
                },
                be: function(expected) {
                    assert.strictEqual(actual, expected);
                }
            },

            not: {
                toBe: function(expected) {
                    assert(actual !== expected);
                },

                toThrow: function() {
                    assert.doesNotThrow(actual);
                }
            },

            toThrow: function() {
                assert.throws(actual);
            }
        };

        res.to.be.ok = function() {
            assert.ok(actual);
        };

        res.to.be.a = function(ctor) {
            if ("string" === typeof (ctor)) {
                assert.ok(ctor === typeof (actual));
            } else {
                assert.ok(actual instanceof ctor);
            }
        };

        res.to.be.empty = function() {
            assert.equal(actual.length, 0);
        };

        res.toBe = res.to.be;

        res.toEqual = res.to.eql;

        res.toBeUndefined = function() {
            assert("undefined" === typeof(actual));
        };
        
        return res;
    };
    
    test.expectedDeprecations = function() {};
    
    return test;
});
