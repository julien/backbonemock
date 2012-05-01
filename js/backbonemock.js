(function() {    
  if(typeof Backbone === 'undefined') {
    throw '"Backbone" is undefined, make sure you have loaded ' + 
          'backbone.js before using this mock utility';
  } 
  // Override Backbone.sync
  // because we want to mock the requests
  // we don't care about the method here ...
  Backbone.sync = function(method, model, options) {
    
    var existingModel,
        errorMsg = 'This model\'s url is not mapped',
        resp,
        reId = /\d+/,
        matchId;
    
      
    // TODO: Improve this ...
    model.url.replace(reId, function (match, position, replace) {
      model.url = model.url.replace(match, ':id'); 
      model.set({id: parseInt(match, 10)});
    });


    existingModel = urls[model.url];

    if (method === 'read') {
      if (existingModel) {
        resp = existingModel;
      }
    } else if (method === 'create' || method === 'update') {
      if (existingModel) {
        existingModel = _.extend(existingModel, model.attributes);
        resp = existingModel;
      }  
    } else if (method === 'delete') {
      if (existingModel) {
        existingModel = null;
        resp = existingModel;
      }
    }
    if (resp) {
      setTimeout(options.success, timeout, resp, 200, null);
    } else {
      setTimeout(options.error, timeout, errorMsg);
      throw errorMsg;
    }
  };
    
  var urls = {},
      timeout = 100;
    
  Backbone.mock = function() {
    var args = [].slice.call(arguments, 0);
    var i, l = args.length, options;
    for (i = 0; i < l; i += 1) { 
      options = args[i];
      if (options.url) {
        urls[options.url] = options.response || {};
      }
    }
  };   
}());



