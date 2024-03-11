const autoBind = require("auto-bind");

class Controller {
    constructor () {
        autoBind(this)
    }

    testMethod() {
        return "test string"
    }
}

module.exports = Controller;