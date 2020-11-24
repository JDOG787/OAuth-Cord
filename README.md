# OAuth-Cord

A simple library to lighten and quicken the use of discord's oauth2
<br /> 
![img](https://github.com/JDOG787/OAuth-Cord/blob/master/imgs/oauth-cord.png?raw=true)
# Docs
Lets get started with using OAuth-cord!

## Set Up
First we require the `oauth-cord` package. Then create a new instance of a `Client` which gives us access to multiple methods!
```js
const OAuthCord = require("oauth-cord");
const client = new OAuthCord.Client();
```
## Setting some params
Next we need to tell our `client` some things like a `redirctUrl` and some `scopes`.
```js
const OAuthCord = require("oauth-cord");
const client = new OAuthCord.Client();

client.setRedirect("http://localhost:8080/login"); // Sets for URL to redirect to after authorizing

client.setScopes(["identitfy", "guilds"]); // Set the scopes
```
## Methods
Now we get to the fun part!

### getToken()
When you authorize the app you will get a code. You use that code to get an access token. `Note: this method is async so use we use await here.`
```js
const token = await client.getToken(code); // pass code as param
```

### getUser()
This method lets us get basic user info! `Note: If you add the email scope you will also get the users email in the user object.`
```js
const token = await client.getToken(code); 

client.getUser(token); // set token you got as a param
```

### getUserConnections()
Use this to get a list of a users profile connections. 

```js
const token = await client.getToken(code); 

client.getUserConnections(token);
```
### getUserGuilds()
This method returns the guilds a user is in. 

```js
const token = await client.getToken(code); 

client.getUserGuilds(token);
```

### addUserGuild()
Adds a user to a choosen guild! `Note: You need to create bot for your discord app and have it in the server your trying to invite users to with the "CREATE_INSTANT_INVITE" permission for this to work.`

```js
const token = await client.getToken(code); 

client.addUserGuild(token, botToken, serverId);
// pass token, botToken, and serverId ar params
```

And thats it! Thats all the methods for now.

# Contributing
Feel free to contribute to this project by opening a pull request on github. If you have any sugestions or issues open up a issue on github! 

Bye!
