var monk = require('monk');
var useragent = require('express-useragent');
var db = monk('localhost:27017/lightningtalk');
var topicss = db.get('topics');

exports.list = function(req, res) {
    var holdtime = getDateTime();
    topicss.find({"talktime":holdtime}).then((docs) => {
        res.json(docs);
    }).then(() => db.close());
};

exports.findByName = function(req, res){
    var title = req.query.title;
    topicss.find({"title":title}).then((topicsObj)=>{
        res.json(topicsObj);
    }).then(()=>db.close());
};

exports.getMax=function(req,res){
    topicss.findOne({}, {sort: {id: -1}}).then((topicsObj)=>{
        res.json(topicsObj);
    }).then(() => db.close());
};

exports.add = function(req, res) {
    topicss.findOne({}, {sort: {id: -1}}).then((obj)=>{
        var topics=req.body;
        console.log(JSON.stringify(req.body));
        var source = req.headers['user-agent'];
        var ua = useragent.parse(source);
        var info = JSON.parse(JSON.stringify(ua));
        topics.os = info.os;
        topics.browser = info.browser;
        topics.host = req.headers['host'];
        topics.ipaddr = req.headers['host'];
        topics.createtime = getDateTime();
        topics.talktime = getDateTime();
        if(obj == null) topics.id = 1;
        else topics.id=(parseInt(obj.id)+1)+"";

        topicss.insert(topics).then((docs) => {
            res.json(docs);
        }).then(() => db.close());
    });
};

function getDateTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day ;
}
