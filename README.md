# DBansJS
A Simple and easy way to lookup banned Discord users on DiscordBans

**Installing via NPM.**

```$ npm install dbansjs // NPM repo lags behind slightly.```

**Updating the cache.** *Must be done on code start, recommended to update cache every two hours.*

```dbans.update() // Needs a token. Can be used without a callback```

```dbansjs.update({'token': 'mytoken'}, function() {console.log("IMA  R E G G I E!")} )```

**Looking up users.**

```dbans.lookup( event.d.author.id )``` or ```dbans.lookup("123456789")```.

*For Java developers theres a port in the works [Here!](https://github.com/Deadplex/DBansJava)*
