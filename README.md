Backbone.mock
-------------

What is it?
===========
Backbone.mock is not a "mock" library, it's a simple utility function, 
that allows you to map a Backbone.Model's url to an object that will be used
as a response when using this model's instance fetch and save 
methods.

At one point I needed the ability to test "fake" ajax requests
and this was the stupid and easy way I did it.

A jasmine spec is available to see example usage.

Improvements are welcome.

Cheers.
