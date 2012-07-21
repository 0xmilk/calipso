/**
 * Mocha test case for core configuration library
 */
var should = require('should'),
    fs = require('fs'),
    rootpath = process.cwd() + '/',
    path = require('path'),
    jsc = require('jscoverage'),
    require = jsc.require(module), // rewrite require function
    calipsoHelper = require('./helpers/calipsoHelper', true),
    calipso = calipsoHelper.calipso,
    dbUri,
    Storage = require('core/Storage', true);

describe('Storage', function(){

  before(function(done) {
      //  These have been disabled due to the linked dependency on calipso itself.
      done();
  });

  describe('Core', function(){

    // it('I can connect to local mongodb in install mode', function(done){    
    //   Storage.connect('mongodb://localhost/mocha', true, function(err, connected) {
    //     should.not.exist(err);
    //     connected.should.equal(false); 
    //     done();
    //   });
    // });

    it('I can create in-memory database in install mode', function(done){    
      Storage.connect('memory', {}, true, function(err, connected) {
        should.not.exist(err);
        connected.should.equal(true); 
        done();
      });
    });

    // it('Connecting to an invalid server in install mode results in an error', function(done){    
    //   Storage.connect('mongodb',{host:'nonexistant'}, true, function(err, connected) {
    //     err.should.exist;
    //     connected.should.equal(false);
    //     done();
    //   });
    // });

    it('If not installed, it doesnt actually connect using just connect but doesnt raise an error', function(done){        
      Storage.connect(function(err, connected) {
        should.not.exist(err);
        connected.should.equal(false);
        done();  
      });
    });

    it('If installed, it does actually connect using just connect', function(done){        

      calipso.config.set('installed',true);      
      Storage.connect(function(err, connected) {
        should.not.exist(err);
        connected.should.equal(true);
        done();  
      });

    });

     it('If it cant find the session middleware to replace, it fails', function(done){        

      calipso.config.set('installed',true); 
      calipso.app.stack = [];     
      Storage.connect(function(err, connected) {
        should.exist(err);
        err.message.should.equal('Unable to load the Database backed session, please check your session and db configuration');
        connected.should.equal(false);
        done();  
      });
      
    });
    

    it('If the installed and the server doesnt exist, it fails', function(done){        

      calipso.config.set('installed',true);       
      calipso.config.set('database:type','mongodb'); 
      calipso.config.set('database:configuration:host','invalid/mocha'); 

      Storage.connect(function(err, connected) {
        should.exist(err);
        connected.should.equal(false);
        done();  
      });
      
    });
  

  }); 

  after(function() {
  })

});

