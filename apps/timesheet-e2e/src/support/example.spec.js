var PerfRunner = require('./index.js');
describe('angularjs homepage', function() {

	var perfRunner = new PerfRunner(browser.params.perf);

	it('should greet the named user', function(done) {

		perfRunner.start(); // Start monitoring before the scenario starts running

		browser.get('http://www.angularjs.org');
		element(by.model('yourName')).sendKeys('Julie');
		var greeting = element(by.binding('yourName'));
		expect(greeting.getText()).toEqual('Hello Julie!');

		// Use this once the scenario is over to get the results
		perfRunner.stop().then(function(data) {
			console.log(data);
		});

	});
});