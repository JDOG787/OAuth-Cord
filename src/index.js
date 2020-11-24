const fetch = require("node-fetch");
const FormData = require("form-data");

module.exports.Client = class Client {
    constructor(clientId, clientSecret){
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = "";
        this.scopes = [];
    }

    setRedirect = uri => {
        if (uri.startsWith("http://") || uri.startsWith("https://")) { 
            this.redirectUri = uri;
        } else {
            throw new Error("Incorrect URL format")
        }
    }

    setScopes = scopes => {
        this.scopes = scopes;
    }

    createAuthLink = () => {
        if (this.scopes[0] && this.redirectUri && this.clientId) {
            return `https://discord.com/oauth2/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${this.scopes.join(" ")}`;
        }
    }

    getToken = async code => {
        if (this.scopes[0] && this.redirectUri && code && this.clientId && this.clientSecret) {
            const formData = new FormData();
            formData.append("client_id", this.clientId);
            formData.append("client_secret", this.clientSecret);
            formData.append("grant_type", "authorization_code");
            formData.append("code", code);
            formData.append("redirect_uri", this.redirectUri);
            formData.append("scope", this.scopes.join(" "));
            const res = await fetch(`https://discord.com/api/oauth2/token`, {
                method: "POST",
                body: formData
            })

            const token = await res.json();
            return token;
        } else {
            throw new Error("Required values weren't specified.")
        }   
    }

    getUser = async token => {
        let tokenType = token.token_type;
        let accessToken = token.access_token
        const res = await fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `${tokenType} ${accessToken}`
            }
        })

        const user = await res.json();

        return user;
    }

    getUserConnections = async token => {
        let tokenType = token.token_type;
        let accessToken = token.access_token;

        const res = await fetch("https://discord.com/api/users/@me/connections", {
            headers: {
                Authorization: `${tokenType} ${accessToken}`
            }
        });

        const connections = await res.json();
        return connections;
    }

    getUserGuilds = async token => {
        let tokenType = token.token_type;
        let accessToken = token.access_token;

        const res = await fetch("https://discord.com/api/users/@me/guilds", {
            headers: {
                Authorization: `${tokenType} ${accessToken}`
            }
        });

        const guilds = await res.json();
        return guilds;
    }

    addGuildUser = async (token, botToken, serverId) => {
        let accessToken = token.access_token;

        const user = await this.getUser(token);
        const data = {
            access_token: accessToken
        }
        const res = await fetch(`https://discord.com/api/guilds/${serverId}/members/${user.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bot ${botToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
}