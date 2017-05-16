
    // DBansJS. By Kakol (@kakolisgay/https://github.com/KakolIsSomewhatGay).
    // Code is Licensed under MIT.
    // View here: https://choosealicense.com/licenses/mit/

        var https = require("https");

        try { if (discordbans.toString == undefined) {
            dbans = {}
            dbans.bans = {}
            discordbans = dbans
        }} catch(e) {
            dbans = {}
            dbans.bans = {}
            discordbans = dbans
        }

        dbans.update = function LookupUDCache(id) {

            // Rather not use `const` to avoid having compat issues with N 6.x and earlier.
            var options = {
                hostname: 'bans.discordlist.net',
                port: 443,
                path: '/api',
                method: 'GET',
                headers: {'user-agent': 'DBansJS/1.0 (+https://deadplex.com/profile/kakol/#projects)'}
            };

            var r = https.request(options, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);
                var ofString = ''

                res.on('data', function (d) {
                    ofString += d
                });

                res.on('end', function () {
                    dbans['list'] = ofString.replace(' ', '')
                });

            });

            r.on('error', (e) => {
                console.error(e);
            });r.end();
        }

        dbans.lookup = function LookupID(id, callback) {

            if (!dbans.bans.list) {discordbans.bans.update}
            if (!callback) {
                var toRET = JSON.stringify(dbans['list']).includes(id)
                if (toRET.toString == true) {
                    return true
                } else if (toRET.toString == false) {
                    return false
                } else {
                    return toRET
                }

            } else if (callback) {
                var toRET = JSON.stringify(dbans.bans.list).includes(id)
                if (toRET.toString == true) {
                    return true
                } else if (toRET.toString == false) {
                    return false
                } else {
                    return "Something went wrong :["
                }
            }            
        }

        module.exports = dbans
