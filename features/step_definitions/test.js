'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.Given(/^I go to "([^"]*)"$/, function (site, callback) {
        browser.get(site);
        callback();
    });

    this.When(/^I add "([^"]*)" in the task field$/, function (task, callback) {
        element(by.model('todoList.todoText')).sendKeys(task);
        callback();
    });

    this.When(/^I click the add button$/, function (callback) {
        var el = element(by.css('[value="add"]'));
        el.click();
        callback();
    });

    this.Then(/^I should see my new task in the list$/, function (callback) {
        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).to.eventually.equal(3);
        expect(todoList.get(2).getText()).to.eventually.equal('Be Awesome')
            .and.notify(callback);
    });

};
