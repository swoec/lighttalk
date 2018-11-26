var topicsService = function () {
    var monk = require('monk');
    var db = monk('localhost:27017/lightningtalk');

    function Dao() {
        this.getAllTopics = function () {
            return db.get('topics');
        }
    }

}

module.exports = topicsService;
