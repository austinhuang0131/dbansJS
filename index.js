
    // DBansJS. By Kakol (@kakolisgay/https://github.com/KakolIsSomewhatGay).
    // Code is Licensed under MIT.
    // View here: https://choosealicense.com/licenses/mit/

        var https = require("https");

        try { if (discordbans == undefined) {
            dbans = {}
            dbans.bans = {}
            discordbans = dbans
        }} catch(e) {
            dbans = {}
            dbans.bans = {}
            discordbans = dbans
        }

        dbans.update = function LookupUDCache(callback) {

            // Rather not use `const` to avoid having compat issues with N 6.x and earlier.
            var options = {
                hostname: 'bans.discordlist.net',
                port: 443,
                path: '/api',
                method: 'GET',
                headers: {'user-agent': 'DBansJS/1.0 (+https://github.com/KakolIsSomewhatGay/dbansJS/)'}
            };

            var r = https.request(options, (res) => {
                var ofString = ''

                res.on('data', function (d) {
                    ofString += d
                });

                res.on('end', function () {
                    dbans['list'] = ofString.replace(' ', '')
                    try {if (callback !== undefined) {callback()}} catch(e){}
                });

            });

            r.on('error', (e) => {
                console.error(e);
            });r.end();
        }

        dbans.lookup = function LookupID(id, callback) {

            if (!dbans.bans.list) {dbans.update()}
            if (!callback) {
                var toRET = JSON.stringify(dbans['list']).includes("['" + id + "']")
                if (toRET.toString == true) {
                    return true
                } else if (toRET.toString == false) {
                    return false
                } else {
                    return toRET
                }
            } else if (callback) {
                var toRET = JSON.stringify(dbans['list']).includes("['" + id + "']")
                if (toRET.toString == "true") {
                    callback(true)
                } else if (toRET.toString == "false") {
                    callback(false)
                } else {
                    callback(toRET)
                }
            }            
        }

        module.exports = dbans
