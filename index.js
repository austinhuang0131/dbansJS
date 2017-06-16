
    // DBansJS. By Kakol (@kakolisgay/https://github.com/KakolIsSomewhatGay).
    // Code is Licensed under MIT.
    // View here: https://choosealicense.com/licenses/mit/

        //var https = require("https");       // I gave up with both of these options
        //var qstri = require('querystring'); // so I'll just use needle instead
        var needl = require('needle');
        var version = "0.1.2" // For tracking

        try { if (discordbans == undefined) {
            dbans = {}
            dbans.bans = {}
            discordbans = dbans
        }} catch(e) {
            dbans = {}
            dbans.bans = {}
            discordbans = dbans
        }

        dbans.update = function LookupUDCache(object, callback) {

            if (object == undefined) {new Error("DBansJS Invalid Params", "You must now pass the following when calling dbans.update: {'token': 'dbanstoken'}")}

            var opt = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'user-agent': 'DBansJS/' + version + ' (+https://github.com/KakolIsSomewhatGay/dbansJS/)'
            }

            var data = {"token": object.token}
            needl.post('https://bans.discordlist.net/api', data, opt, function(err, resp) {
                if (err) {new Error(err)} else {
                    if (resp.body.includes("No token specified!") == true) {
                        new Error("The token you specified was invalid according to the API. Contact Silicon")
                    } else if (resp.body.includes("Invalid token.") == true) {
                        new Error("The token you specified was invalid according to the API. Contact Silicon")
                    } else {
                        dbans['list'] = resp.body.replace(' ', '')
                        try {if (callback !== undefined) {callback()}} catch(e){}
                    }
                }
            });

        }

        dbans.lookup = function LookupID(id, callback) {

            if (dbans['list'] == undefined) {new Error("DBansJS is not ready", "Call dbans.update before looking up users.")}

            // COMMENCE GLORIFIED INCLUDES!!!!!!!!!!!!
            var temp = dbans['list'].includes(id.toString('utf-8'))
            if (temp == true) {
                if (callback) {callback(true)} else {return true}
            } else {
                if (callback) {callback(false)} else {return false}
            }

            return false // How the hell are we here?

        }

        module.exports = dbans
