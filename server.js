var express = require('express'),
    app     = express(),
    bodyParser = require('body-parser'),
    winston = require('winston'),
    expressWinston = require('express-winston'),
    logfile = process.env.LOGFILE || './log-tailer.log';


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            json: true,
            maxsize: 1024 * 1024 * 512,
            filename: logfile
        })
    ]
}));

var port = process.env.PORT || 80;

var router = express.Router();
router.get('/', function(req,res){
    res.json({ message: 'test!' });
});

app.use('/api',router);

app.listen(port);
console.log("Magic happens on port " + port);
