# DBansJS
A Simple and easy way to lookup banned Discord users on DiscordBans

**Updating the cache.** *Must be done on code start, recommended to update cache every two hours.*

```dbans.update() // Blocking Event```

**Looking up users.**

```dbans.lookup( event.d.author.id )``` or ```dbans.lookup("123456789")```.
