
/*
	Initialise the Instagram API and authenticate.
*/
var instagramApi = Instajam.init({
    clientId: '4f9f3a58b64c47fb9f0f9ec8a94b1ea3',
    redirectUri: 'http://localhost:8080',
    scope: ['basic', 'comments']
});

if (!instagramApi.authenticated) {
        window.location = API.authUrl;
}