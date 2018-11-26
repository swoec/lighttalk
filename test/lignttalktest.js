var webdriver = require('selenium-webdriver'),
    chai = require('chai');

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
describe('hooks', function () {

    before(function () {
        // runs before all tests in this block
        driver.get('http://127.0.0.1:3001/home');
    });

    after(function () {
        // runs after all tests in this block
        driver.quit();
    });

    it("display", function () {
        var head = driver.findElement(webdriver.By.id('head'));
        expect(head.isDisplayed()).to.eventually.be.true;
    });

    it("add", function () {
        var title = driver.findElement(webdriver.By.id('title'));
        title.sendKeys("Docker");
        var description = driver.findElement(webdriver.By.id('description'));
        description.sendKeys("Docker container");
        var email = driver.findElement(webdriver.By.id('email'));
        email.sendKeys("a@gmail.com");
        var sbtn = driver.findElement(webdriver.By.id("btnU"));
        sbtn.click();
        var docker = driver.findElement(webdriver.By.id("Docker"));
        expect(docker.isDisplayed()).to.eventually.be.true;
    });

    it("check unique", function () {
        var title = driver.findElement(webdriver.By.id('title'));
        title.sendKeys("Docker");
        var sbtn = driver.findElement(webdriver.By.id("btnU"));
        sbtn.click();
        var msg = driver.findElement(webdriver.By.id("errmsg"));
        expect(Promise.resolve(msg.getText().toString())).to.eventually.equal('topics should be unique');
    });
});
