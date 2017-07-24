/* DBansJS. By Kakol (@kakolisgay/https://github.com/KakolIsSomewhatGay). Code is Licensed under MIT. View here: https://choosealicense.com/licenses/mit/ */
var needl = require("needle"),
    version = "0.1.4",
    dbans = {};
needl.defaults({
    user_agent: "DBansJS/" + version + " (+https://github.com/KakolIsSomewhatGay/dbansJS/)"
}), dbans.update = function(e, n) {
    void 0 == e && new Error("DBansJS Invalid Params", "You must now pass the following when calling dbans.update: {'token': 'dbanstoken'}");
    var o = {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        t = {
            token: e.token
        };
    needl.post("https://bans.discordlist.net/api", t, o, function(e, o) {
        if (e) new Error(e);
        else if (1 == o.body.includes("No token specified!")) new Error("The token you specified was invalid according to the API. Contact Silicon");
        else if (1 == o.body.includes("Invalid token.")) new Error("The token you specified was invalid according to the API. Contact Silicon");
        else {
            dbans.list = o.body.replace(/ /g, "");
            try {
                void 0 !== n && n()
            } catch (e) {}
        }
    })
}, dbans.lookup = function(e, n) {
    if (void 0 == dbans.list && new Error("DBansJS is not ready", "Call dbans.update before looking up users."), 1 == dbans.list.includes(e.toString("utf-8"))) {
        if (!n) return !0;
        n(!0)
    } else {
        if (!n) return !1;
        n(!1)
    }
    return !1
}, module.exports = dbans;
