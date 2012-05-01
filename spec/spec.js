describe("Backbone.mock", function() {
  var mock, User;
  
  mock = Backbone.mock({ 
    url: '/user', 
    response: { 
      name: 'user 1',
      age: 21,
      email: 'user1@domain.com'
    }
  }, {
    url: '/product/:id',
    response: {
      productname: 'ACME Product'
    }
  });
  
  User = Backbone.Model.extend({
    url: '/user'
  });

  beforeEach(function() {
    // Just used for debugging
    // console.log('beforeEach');
    this.user = new User();
  });

  it('should be able to fetch data', function () {
    var self = this;
    this.user.fetch({
      error: function (model, options, response) {
        // console.log('error fetching model: ', arguments);
      },
      success: function (resp, status, xhr) {
        // console.log('success fetching model: ', arguments);
      }
    });
    
    waitsFor(function () {
      return self.user.get('name') !== undefined;
    }, 1000);

    runs(function () {
      expect(self.user.get('name')).toEqual('user 1');
    });
  });
  
  it('should be able to save data', function () {
    var self = this;
    this.user.save({ name: 'user 2' }, {
      error: function (model, options, response) {
        // console.log('error saving model: ', arguments);
      },
      success: function (resp, status, xhr) {
        // console.log('success saving model: ', arguments);
      }
    });
    
    waitsFor(function () {
      return self.user.get('name') !== undefined;
    }, 1000);

    runs(function () {
      expect(self.user.get('name')).toEqual('user 2');
    });
  });

  it('should throw an error if the model\'s url is not mapped', function () {
    var self = this,
      FakeUser = Backbone.Model.extend({
        url: '/nonexisting'
      });
    this.user = new FakeUser();
    expect(function () {
      self.user.fetch();
    }).toThrow('This model\'s url is not mapped');
  });

  it('should be able to query urls with parameters', function () {
    var self = this,
      Product = Backbone.Model.extend({
        url: '/product/' + 33,

        getProductName: function () {
          if (this.get('productname')) {
            return this.get('productname');
          }                
        }

      }),
      product = new Product();

    product.fetch({
      error: function () {
        // console.log('error fetching model data: ', arguments);       
      },
      success: function () {
        // console.log('success fetching model data: ', arguments);         
      }
    });

    waits(1500);
    expect(product.get('id')).toEqual(33);
    spyOn(product, 'getProductName');
  });

});
